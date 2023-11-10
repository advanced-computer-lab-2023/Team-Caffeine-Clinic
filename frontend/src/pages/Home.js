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
  }, []);

  return (
    <div className='home'>
    <h2 className='welcome-message'>Welcome to Home Page</h2>
    {selectedPatient && (
      <div>
        <h3>Selected Patient Details</h3>
        <p>Username: {selectedPatient.username}</p>
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
    )}
  </div>
  );
};

export default Home;
