import { Link } from 'react-router-dom'


import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';

const PerscriptionDetails = ({ perscription }) => {
  // const [doctors, setDoctors] = useState('');

  // const select = async(e) => {
  //   e.preventDefault()

  //   const objectString = JSON.stringify(perscription._id);

  //   const url = '/api/perscription/singlePersc/' + objectString

  //   const response = await fetch(url)

  //   const json = await response.json();

  // }

    //const objectString = JSON.stringify(perscription);

    //console.log(perscription);

    //localStorage.setItem('setPrescription', perscription);
    const [doctorName, setName] = useState('');

    useEffect(() => {
      const fetchName = async () => {
        if (perscription.doctorID) {
          // Construct the URL with the doctorID
          const url = `/api/perscription/doctor/${perscription.doctorID}`;

          const response = await fetch(url);
          if (!response.ok) {
            console.log('Error fetching prescription data');
            return; // Handle the error appropriately
          }

          const json = await response.json();
          setName(json);
        }
      };

      fetchName();
    }, [perscription.doctorID]); // Include id as a dependency to re-fetch the data when the id changes


    return (
      <div className="doctor-details">
          <div className="details"><strong>Patient: </strong>{perscription.patientID}</div>
          <div className="details"><strong>Doctor: </strong>{doctorName}</div>
          <div className="details"><strong>Date: </strong>{perscription.date_of_perscription}</div>
          <div className="details"><strong>state: </strong>{perscription.state}</div>
          <div className="details"><strong>medicine: </strong>{perscription.medicine}</div>
          <Link to={`/SinglePerscriptions/${perscription._id}`}>
          <Button className="perscButton" variant='info '>
            Select
          </Button>
          </Link>
      </div>
    )
  }
  
  export default PerscriptionDetails;