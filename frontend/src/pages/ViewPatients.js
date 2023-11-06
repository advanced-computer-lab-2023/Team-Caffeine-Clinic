// MyPatients.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';


const MyPatients = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const {user} = useAuthContext()

  
  const fetchPatientDetails = async (patientUsername) => {
    
    try {
      const response = await fetch(`/api/doctorInfo/selectpatient?name=${patientUsername}`);

      if (!response.ok) {
        throw new Error('Failed to fetch patient details');
      }

      const data = await response.json();
      setSelectedPatient(data.patient);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch patient details');
    }
  };

  const clearSelectedPatient = () => {
    setSelectedPatient(null);
  };

  useEffect(() => {
    // Fetch the list of patients when the component mounts
    const fetchDoctorPatients = async () => {
      try {
  //       const storedUsername = localStorage.getItem('username');

  // if (!storedUsername) {
  //   setError('No username found in session.');
    
  //   return;
  // }
        const response = await fetch(`/api/doctorInfo/myPatients/`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }); // You should replace with your actual API endpoint

        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }

        const data = await response.json();
        setPatients(data.patientUsernames);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch patients');
      }
    };
    if(user){
      fetchDoctorPatients();
    }
  }, [user]);

  const displayPatientDetails = () => {
    if (selectedPatient) {
      return (
        <div>
          <h2>Selected Patient</h2>
          <p>Username: {selectedPatient.username}</p>
          <p>Name: {selectedPatient.name}</p>
          <p>Email: {selectedPatient.email}</p>
          <p>Date of birth: {selectedPatient.dob}</p>
          <p>Gender: {selectedPatient.gender}</p>
          <p>Mobile Number: {selectedPatient.mobile_number}</p>
  
          {selectedPatient.emergency_contact && (
          <div>
            <h2>Emergency Contact</h2>
            <p>Name: {selectedPatient.emergency_contact.full_name}</p>
            <p>Mobile Number: {selectedPatient.emergency_contact.mobile_number}</p>
            <p>Relation: {selectedPatient.emergency_contact.relation_to_the_patient}</p>
          </div>
        )}
  
          <button onClick={clearSelectedPatient}>Close</button>
        </div>
      );
    } else {
      return null;
    }
  };
  

  return (
    <div>
      <h1>My Patients</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {patients.length > 0 ? (
          patients.map((patientUsername, index) => (
            <li key={index}>
              {patientUsername}
              <button onClick={() => fetchPatientDetails(patientUsername)}>Select Patient</button>
            </li>
          ))
        ) : (
          <p>No patients found for this doctor.</p>
        )}
      </ul>
      {displayPatientDetails()}
    </div>
  );
};

export default MyPatients;
