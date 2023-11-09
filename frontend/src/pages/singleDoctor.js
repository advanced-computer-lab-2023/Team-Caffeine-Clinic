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
  
  const [doctorIndex, setIndex] = useState(null)
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = (theIndex) => {
    setPopupOpen(true);
    setIndex(theIndex)
  };


  const handleCreateAppointment = async (date) => {
    try {
      const response = await fetch(`/api/patient/createAppointment?doctorusername=${username}&date=${date}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          date: date,
        }),
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
  };

  // useEffect(() => {
  //   const fetchWallet = async () => {
  //     try {
  //       const response = await fetch('/api/patient/getWallet', {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`,
  //         }
  //       })
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setWallet(data)
  //     } catch (error) {
        
  //     }
  //   }
  //   if(user){
  //     fetchWallet()
  //   }
  // }, [user])

  const handleWallet = async () => {
    try {
      
    } catch (error) {
      
    }
  }

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
      <Navbar />
      <div className="single-doctor-details">
        {/* ... */}
        <div className="details">
          <strong>Available Dates: </strong>
          {doctor.availableDates && Array.isArray(doctor.availableDates) ? (
            <ul>
              {doctor.availableDates.map((date, index) => (
                <li key={index}>
                  {date}{' '}
                  <button onClick={() => openPopup(doctor.availableDates[index])/*() => handleCreateAppointment(doctor.availableDates[index])*/}>
                    Book Appointment
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            'No Dates available'
          )}
         
        </div>
        {isPopupOpen && (
                  <Elements stripe={stripePromise}> <PaymentForm username={doctor.username} amount={doctor.rateAfterDiscount} onPaymentResult={() => handleCreateAppointment(doctorIndex)}/> </Elements>
                  )}
      </div>
    </>
  );
};

export default SingleDoctor;
