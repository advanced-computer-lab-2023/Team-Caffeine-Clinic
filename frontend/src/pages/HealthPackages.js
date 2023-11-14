import HealthPackDetails from '../components/HealthPackDetails';
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useEffect, useState } from 'react';

import PaymentForm from '../components/PaymentHandler';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51OABYlCDYNw0lbpN84PaD596nbIQM1GoWS1g6brg1wQxkm60xMam3ZKRANUdIzjK503IMzQ4TkFheaYGWMHcHZvS00wD6HxMit');

const HealthPackages = () => {
  const [healthPackages, setHealthPackages] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [showFamilyMembers, setShowFamilyMembers] = useState(true);
  const [showHealthPackages, setShowHealthPackages] = useState(true); // Change to true
  const [fampay, setfampay] = useState(false); // Change to true
  const [famusername, setfamusername] = useState(''); // Change to true
  const [Hpackage, setPackage] = useState(null)
  const [amount, setAmount] = useState(null)
  const [discount, setDiscount] = useState(0)
  const [isPopupOpen, setPopupOpen] = useState(false);



  const [error, setError] = useState(null);

  const user = useAuthContext();
  
  useEffect(() => {
    const fetchFamilyMemberDiscount = async () => {
      try {
        const response = await fetch('/api/patient/getFamilyDiscount', {
          headers: {
            'Authorization': `Bearer ${user.user.token}`
          }
        })

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        setDiscount(data.discount)

      } catch (err) {
        setError(err)
      }
    }
    if(user){
      fetchFamilyMemberDiscount()
    }
  }, [user])

  const openPopup = (healthPackageName, healthPackagePrice) => {
    setPopupOpen(true);
    setPackage(healthPackageName)
    setAmount(healthPackagePrice)
  };

  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const response = await fetch('/api/healthpackage', {
          headers: {
            'Authorization': `Bearer ${user.user.token}`
          }
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        setHealthPackages(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (user) {
      fetchHealthPackages();
    }
  }, [user]);

  const fetchFamilyMembers = async () => {
    try {
      const response = await fetch(`/api/familyMembers/getFamilyMembers`, {
        headers: {
          Authorization: `Bearer ${user.user.token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const familyMembersData = await response.json();
      setFamilyMembers(familyMembersData.familyMembers);
    } catch (error) {
      setError(error.message);
    }
  };

  const subscribe = async (hpname,value,patientusername) => {
    if(!fampay){
    try {
     
      const response2 = await fetch(`/api/patient/addHealthPackageTransaction?value=${value}&healthPackageName=${hpname}`, {
        method: 'POST',
        headers: {
        
          Authorization: `Bearer ${user.user.token}`,
        },
      });
      if(!response2.ok){
        throw new Error('Network response was not ok');

      }
      
      window.location.reload();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }}else{
      try {
        console.log(value)
        console.log(hpname)
        console.log(patientusername)

        const response2 = await fetch(`/api/patient/addHealthPackageTransactionfam?value=${value}&patientId=${patientusername}&healthPackageName=${hpname}`, {
          method: 'POST',
          headers: {
            
            Authorization: `Bearer ${user.user.token}`,
          },
        });
        if(!response2.ok){
          throw new Error('Network response was not ok');
  
        }
       
        window.location.reload();
  
      } catch (error) {
        console.error('Error creating appointment:', error);
      }
    }
  };

  const handleMyselfClick = () => {
    setShowFamilyMembers(false);
    setShowHealthPackages(false);
  };

  const handleFamilyMembersClick = () => {
    fetchFamilyMembers();
  };

  const handleFamilyMemberSubscribe = (name) => {
    setShowFamilyMembers(false);
    setShowHealthPackages(false);
    setfampay(true);
    setfamusername(name);
    
  };

  return (
    <div className="health-packages">
      <div>
        {showFamilyMembers && (
          <>
            <button onClick={handleMyselfClick}>For Myself</button>
            <button onClick={handleFamilyMembersClick}>For Family Members</button>
          </>
        )}
      </div>

      {showFamilyMembers && familyMembers.length > 0 && (
        <div>
          <h2>Family Members</h2>
          <ul>
            {familyMembers.map((familyMember) => (
              <li key={familyMember.id}>
                {familyMember.name}
                <button onClick={() => handleFamilyMemberSubscribe(familyMember.username)}>Subscribe</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {showHealthPackages || healthPackages.length === 0 ? (
        <></>
      ) : (
        <ul>
          {healthPackages.map((hp) => (
            <div className='Admin-details' key={hp.name}>
              <li>
                <div className='name'>{hp.name}</div>
                <div>description: {hp.description}</div>
                <div>Services Included: {hp.servicesIncluded}</div>
                <div>basePrice: {hp.basePrice}</div>
                <div>Doctor Session Discount: {hp.discounts.doctorSession * 100}%</div>
                <div>Medicine Discount: {hp.discounts.pharmacyMedicine * 100}%</div>
                <div>Family Member Discount: {hp.discounts.familySubscription * 100}%</div>
              </li>
              <span className='span' onClick={() => openPopup(hp.name, hp.basePrice)}>Subscribe</span>

              {isPopupOpen && (
              <Elements stripe={stripePromise}>
              <PaymentForm
                amount={amount - (amount * discount)}
                onPaymentResult={() =>fampay? subscribe(Hpackage, (amount - (amount * discount)), famusername):subscribe(Hpackage,amount)}
              />
            </Elements>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HealthPackages;