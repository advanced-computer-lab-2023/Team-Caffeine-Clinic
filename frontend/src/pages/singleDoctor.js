import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuthContext } from '../hooks/useAuthContext';

const SingleDoctor = () => {
  const { username } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  const handleCreateAppointment = async (date) => {
    try {
      const response = await fetch(`/api/patient/createAppointment/dusername=${doctor}&appointmentDate=${doctor.availableDates}`, {
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

      // Handle successful response here
      // e.g., show a success message or update the UI accordingly
    } catch (error) {
      console.error('Error creating appointment:', error);
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
                  <button onClick={() => handleCreateAppointment(date)}>
                    Book Appointment
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            'No Dates available'
          )}
        </div>
      </div>
    </>
  );
};

export default SingleDoctor;
