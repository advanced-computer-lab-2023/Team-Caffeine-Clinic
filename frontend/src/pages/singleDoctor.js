import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuthContext } from '../hooks/useAuthContext';

import PaymentForm from '../components/PaymentHandler';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51OABYlCDYNw0lbpN84PaD596nbIQM1GoWS1g6brg1wQxkm60xMam3ZKRANUdIzjK503IMzQ4TkFheaYGWMHcHZvS00wD6HxMit');


const SingleDoctor = () => {
  const { username } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const [payment, setpayment] = useState(null);
  const [isForSelf, setIsForSelf] = useState(null);
  const [familyMembers, setFamilyMembers] = useState(null);
  const [fammember , setFam]= useState(null);
  const [fampay, setfampay] = useState(false);
  const [doctorIndex, setIndex] = useState(null)
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isButtonsVisible, setButtonsVisible] = useState(true);


  const openPopup = (theIndex) => {
    setPopupOpen(true);
    setIndex(theIndex)
  };
  const  paymentHandel = (theIndex) => {
    setpayment(payment)

  };
  const fammemberhandel=(username,date,rate) => {
    setFam(username)
    setIsForSelf(true);
    setButtonsVisible(false);
    setfampay(true)
  };


  const handleCreateAppointment = async (date,patientusername) => {
    if(!fampay){
    try {
      const response2 = await fetch(`/api/patient/addTransactionAppointment?doctorUsername=${username}&appointmentDate=${date}&transactionValue=${doctor.rateAfterDiscount}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      if(!response2.ok){
        throw new Error('Network response was not ok');

      }
      
      const response = await fetch(`/api/patient/createAppointment?doctorusername=${username}&date=${date}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        }
      });
    

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      window.location.reload();

      // Handle successful response here
      // e.g., show a success message or update the UI accordingly
    } catch (error) {
      console.error('Error creating appointment:', error);
    }}else{
      try {
        const response2 = await fetch(`/api/patient/addTransactionAppointmentfam?doctorUsername=${username}&patient=${patientusername}&appointmentDate=${date}&transactionValue=${doctor.rateAfterDiscount}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        if(!response2.ok){
          throw new Error('Network response was not ok');
  
        }
        
        const response = await fetch(`/api/patient/createAppointmentfam?patient=${patientusername}&doctorusername=${username}&date=${date}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          }
        });
      
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        window.location.reload();
  
        // Handle successful response here
        // e.g., show a success message or update the UI accordingly
      } catch (error) {
        console.error('Error creating appointment:', error);
      }
    }
  };
  const handleButtonClick = async (forSelf) => {
    setIsForSelf(forSelf);
    setButtonsVisible(false);

    if (!forSelf) {
      try {
        const response = await fetch(`/api/familyMembers/getFamilyMembers`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const familyMembersData = await response.json();
        const thearray = familyMembersData.familyMembers;
        console.log(familyMembersData);
        setFamilyMembers(thearray);

      } catch (error) {
        setError(error.message);
      }
    }
  };


  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/doctors/getSingleDoctor/${username}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.rateAfterDiscount);
        setDoctor(data);
      } catch (error) {
        setError(error.message);
      }

     
    };

    if (user) {
      fetchDoctor();
    }
  }, [username, user]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!doctor) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isButtonsVisible && (
        <div className="toggle-buttons">
          <button onClick={() => handleButtonClick(true)}>For Myself</button>
          <button onClick={() => handleButtonClick(false)}>For Family Member</button>
        </div>
      )}
      {isForSelf !== null && (
        <>
          <Navbar />
          {isForSelf ? (
            <div className="single-doctor-details">
              <div className="details">
                <strong>Available Dates: </strong>
                {doctor.availableDates && Array.isArray(doctor.availableDates) ? (
                  <ul>
                    {doctor.availableDates.map((date, index) => (
                      <li key={index}>
                        {date}{' '}
                        <button onClick={() => {
                          openPopup(doctor.availableDates[index]);
                          paymentHandel(doctor.rateAfterDiscount);
                        }}>
                          Pay
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  'No Dates available'
                )}
              </div>
            </div>
          ) : (
            <div className="family-member-details">
              <strong>Family Members:</strong>
              <ul>
                {Array.isArray(familyMembers)&&familyMembers.map((familyMember, index) => (
                  <li key={index}>
                    {familyMember.name}{' '}
                    <button onClick={() => {
                     fammemberhandel(familyMember.username  );
                    }}>
                      Book
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isPopupOpen && (
            <Elements stripe={stripePromise}>
              <PaymentForm
                username={doctor.username}
                amount={doctor.rateAfterDiscount}
                onPaymentResult={() => handleCreateAppointment(doctorIndex, fammember)}
              />
            </Elements>
          )}
        </>
      )}
    </>
  );
};


export default SingleDoctor;
