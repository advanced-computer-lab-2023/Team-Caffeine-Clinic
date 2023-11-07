import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { useAuthContext } from '../hooks/useAuthContext';

const SingleDoctor = () => {
  const { username } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);

  const {user} = useAuthContext()

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        // console.log(username);
        const response = await fetch(`/api/doctors/getSingleDoctor/${username}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDoctor(data);
        console.log(data.availableDates);
      } catch (error) {
        setError(error.message);
      }
    };
    
    if(user){
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
      <div className="name">{doctor.name}</div>
      <div className="details"><strong>speciality: </strong>{doctor.speciality}</div>
      <div className="details"><strong>rate: </strong>{doctor.originalRate}</div>
      <div className="details"><strong>affiliation: </strong>{doctor.affiliation}</div>
      <div className="details"><strong>email: </strong>{doctor.email}</div>
      <div className="details"><strong>education: </strong>{doctor.education}</div>
      <div className="details"><strong>session price: </strong>{doctor.rateAfterDiscount + 0.1 * (doctor.rateAfterDiscount)}</div>
      <div className="details">
        <strong>Available Dates: </strong>
        {doctor.availableDates && Array.isArray(doctor.availableDates) ? (
          <ul>
            {doctor.availableDates.map((Date, index) => (
              <li key={index}>{Date}</li>
            ))}
          </ul>
        ) : (
          "No Dates available"
        )}
      </div>
    
    </div>
    </>
  );
};

export default SingleDoctor;
