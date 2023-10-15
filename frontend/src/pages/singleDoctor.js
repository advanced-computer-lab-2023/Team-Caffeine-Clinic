import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'

const SingleDoctor = () => {
  const { username } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        // console.log(username);
        const response = await fetch(`/api/doctors/getSingleDoctor/${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchDoctor();
  }, [username]);

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
    </div>
    </>
  );
};

export default SingleDoctor;
