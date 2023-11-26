import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";


const Home = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const user = useAuthContext()


  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch('/api/patient/selectpatient', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.user.token}`
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSelectedPatient(data.patient);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatient();
  }, [user.user.token]); 

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}


  return (
    <div className='home'>
    <h1>Patient Report</h1>
    {selectedPatient && (
      <div className='all-info'>
        <div className='box'>
          <h2 className='name'>{selectedPatient.name}</h2>
          <p><strong>Patient Username:</strong> {selectedPatient.username}</p>
          <p><strong>Age:</strong> {selectedPatient.dob ? calculateAge(selectedPatient.dob) : 'Unknown'}</p>
          <p><strong>Gender:</strong> {selectedPatient.gender}</p>
         
        </div>

        <div className='box'>
          <h3>ff</h3>
          <p><strong>Username:</strong> {selectedPatient.username}</p>
          <p>Name: {selectedPatient.name}</p>
          <p>Email: {selectedPatient.email}</p>
          <p>Date of Birth: {selectedPatient.dob}</p>
          <p>Gender: {selectedPatient.gender}</p>
          <p>Mobile Number: {selectedPatient.mobile_number}</p>
          <p>Health Package: {selectedPatient.health_package}</p>
          <p>Health Records:</p>
          <ul>
            {selectedPatient.health_records.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
          </ul>
          <p>Emergency Contact: {selectedPatient.emergency_contact.full_name}</p>
          <p>Emergency Contact Mobile Number: {selectedPatient.emergency_contact.mobile_number}</p>
          <p>Relation to the Patient: {selectedPatient.emergency_contact.relation_to_the_patient}</p>
          <p>Wallet: {selectedPatient.wallet}</p>
        </div>

        <div className='box'>
          <h3>information</h3>
          <p><strong>Username:</strong> {selectedPatient.username}</p>
          <p>Name: {selectedPatient.name}</p>
          <p>Email: {selectedPatient.email}</p>
          <p>Date of Birth: {selectedPatient.dob}</p>
          <p>Gender: {selectedPatient.gender}</p>
          <p>Mobile Number: {selectedPatient.mobile_number}</p>
          <p>Health Package: {selectedPatient.health_package}</p>
          <p>Health Records:</p>
          <ul>
            {selectedPatient.health_records.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
          </ul>
          <p>Emergency Contact: {selectedPatient.emergency_contact.full_name}</p>
          <p>Emergency Contact Mobile Number: {selectedPatient.emergency_contact.mobile_number}</p>
          <p>Relation to the Patient: {selectedPatient.emergency_contact.relation_to_the_patient}</p>
          <p>Wallet: {selectedPatient.wallet}</p>
        </div>

        <div className='box'>
          <h3>info</h3>
          <p><strong>Username:</strong> {selectedPatient.username}</p>
          <p>Name: {selectedPatient.name}</p>
          <p>Email: {selectedPatient.email}</p>
          <p>Date of Birth: {selectedPatient.dob}</p>
          <p>Gender: {selectedPatient.gender}</p>
          <p>Mobile Number: {selectedPatient.mobile_number}</p>
          <p>Health Package: {selectedPatient.health_package}</p>
          <p>Health Records:</p>
          <ul>
            {selectedPatient.health_records.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
          </ul>
          <p>Emergency Contact: {selectedPatient.emergency_contact.full_name}</p>
          <p>Emergency Contact Mobile Number: {selectedPatient.emergency_contact.mobile_number}</p>
          <p>Relation to the Patient: {selectedPatient.emergency_contact.relation_to_the_patient}</p>
          <p>Wallet: {selectedPatient.wallet}</p>
        </div>
      </div>
    )}
  </div>
  );
};

export default Home;