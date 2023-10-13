import React, { useState } from 'react';

const SelectPatient = () => {
  const [patientUsername, setPatientUsername] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [error, setError] = useState('');

  const fetchPatientData = async () => {
    try {
      // const storedUsername = localStorage.getItem('username');
      // if (!storedUsername) {
      //   setError('No username found in session.');
      //   return;
      // }
      const response = await fetch(
        `/api/searchmyPatients/?patientUsername=${patientUsername}`
      );
      
      if (!response.ok) {
       
        setError('Error fetching patient data.');
        setSelectedPatient(null);
      } else {
        const data = await response.json();
        setSelectedPatient(data.patient);
        setError('');
      }
    } catch (error) {
      console.error(error);
      setError('Internal Server Error.');
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="patientUsername">Patient Username:</label>
        <input
          type="text"
          id="patientUsername"
          value={patientUsername}
          onChange={(e) => setPatientUsername(e.target.value)}
        />
      </div>

      <button onClick={fetchPatientData}>Fetch Patient Data</button>

      {selectedPatient ? (
        <div>
          <h2>Selected Patient</h2>
          <p>UserName: {selectedPatient.username}</p>
          <p>Name: {selectedPatient.name}</p>
          <p>Email: {selectedPatient.email}</p>
          <p>Date of birth: {selectedPatient.dob}</p>
          <p>Gender: {selectedPatient.gender}</p>
          <p>Mobile Number: {selectedPatient.mobilenumber}</p>

          {selectedPatient.emergencycontact ? (
            <div>
              <h2>Emergency Contact</h2>
              <p>Name: {selectedPatient.emergencycontact.full_name}</p>
              <p>Mobile Number: {selectedPatient.emergencycontact.mobile_number}</p>
              <p>Relation: {selectedPatient.emergencycontact.relation_to_the_patient}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {error && <p>{error}</p>}
    </div>
  );
};

export default SelectPatient;
