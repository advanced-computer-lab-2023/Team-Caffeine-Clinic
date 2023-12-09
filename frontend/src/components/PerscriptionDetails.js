import { Link } from 'react-router-dom'


import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Perscription from '../pages/Perscriptions';
import { useAuthContext } from '../hooks/useAuthContext';

const PerscriptionDetails = ({ perscription }) => {
  const [doctorName, setName] = useState('');
  const [patientname, setPatientname] = useState('')

  const { user } = useAuthContext()

  useEffect(() => {
    const fetchName = async () => {
      if (perscription.doctorID) {
        // Construct the URL with the doctorID
        const url = `/api/perscription/doctor/${perscription.doctorID}`;

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) {
          console.log('Error fetching prescription data');
          return; // Handle the error appropriately
        }

        const json = await response.json();
        setName(json);
      }
    };
    if (user) {
      fetchName();
    }
  }, [perscription.doctorID, user]); // Include id as a dependency to re-fetch the data when the id changes


  return (
    <div className="perscription-details">
      <div className="details"><strong>Doctor: </strong>{doctorName}</div>
      <div className="details"><strong>Date: </strong>{perscription.date_of_perscription}</div>
      <div className="details"><strong>state: </strong>{perscription.state}</div>
      <div className="details">
        {console.log(perscription.medicine)}
        <strong>Medicine: </strong>
        <ul>
          {perscription.medicine.map((medicine, index) => (
            <li key={index}>{medicine}</li>
          ))}
        </ul>
      </div>



      <Link to={`/SinglePerscriptions/${perscription._id}`}>
        <Button className="perscButton" variant='info '>
          Select
        </Button>
      </Link>
    </div>
  )
}

export default PerscriptionDetails;