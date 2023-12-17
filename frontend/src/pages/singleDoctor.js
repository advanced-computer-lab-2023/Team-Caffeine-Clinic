import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClinicPatientNavBar from '../components/ClinicPatientNavBar';
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

  const margin = {
    marginTop: '100px',
  }
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
<div className='doctorPage' style={margin}>
          <ClinicPatientNavBar />
      {isButtonsVisible && (
        <div>
          <br />
          <br />
          <div className='text-center'><button className='button-43' onClick={() => handleButtonClick(true)}>For Myself</button></div>
          <br />
          <br />
          <div className='text-center'><button className='button-43' onClick={() => handleButtonClick(false)}>For A Family Member</button></div>
        </div>
      )}
      {isForSelf !== null && (
        <>
          {isForSelf ? (
            <div className="single-doctor-details">
              <br />
              <div className="section-title">
                <h2>Available Dates </h2>
                <h4>Dr. {doctor.name}</h4>
                </div>
                {doctor.availableDates && Array.isArray(doctor.availableDates) ? (
                  <div>
                    {doctor.availableDates.map((date, index) => (
                      <div id="doctors" className="doctors">
                      <div className="container">
                              <div className="row">
                              <div className="col-lg-4">
                          <div className="member d-flex align-items-start">
                              <div className="member-info"> 
                      <div key={index}>
                        {date}{' '}
                        <button className='button-43' onClick={() => {
                          openPopup(doctor.availableDates[index]);
                          paymentHandel(doctor.rateAfterDiscount);
                        }}>
                          Book
                        </button>
                      </div>
                      
                              </div>
        </div>
        </div>
        </div>
        </div>
    <br />
    </div> 
                    ))}
                  </div>
                ) : (
                  'No Dates available'
                )}

            </div>
          ) : (
            <div className="family-member-details text-center">
              <br />
              <div className="section-title">
              <h2>Family Members</h2>
              </div>
              <ul>
                {Array.isArray(familyMembers)&&familyMembers.map((familyMember, index) => (
                <div id="doctors" className="doctors">
                  <div className="container text-center">
                              <div className="row text-center">
                              <div className="col-lg-3 text-center">
                          <div className="member d-flex align-items-center">
                              <div className="member-info"> 
                  <div className='text-center' key={index}>
                    {familyMember.name}{' '}
                    <br />
                    <br />
                    <button className='button-43' onClick={() => {
                     fammemberhandel(familyMember.username  );
                    }}>
                      Book
                    </button>
                  </div>

                  </div>
        </div>
        </div>
        </div>
        </div>
        <br />
        </div>
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
    </div>
  );
};


export default SingleDoctor;
