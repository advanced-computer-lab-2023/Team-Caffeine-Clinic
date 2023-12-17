import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';


const SelectPatient = () => {
  const [patientUsername, setPatientUsername] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [error, setError] = useState('');

  const {user} = useAuthContext()

  const margin = {
    marginTop: '100px',
}


  const fetchPatientData = async () => {
    try {
      // const storedUsername = localStorage.getItem('username');
      // if (!storedUsername) {
      //   setError('No username found in session.');
      //   return;
      // }
      const response = await fetch(
        `/api/doctorInfo/searchmyPatients/?patientUsername=${patientUsername}`,
        {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }
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
    <div style={margin}>
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
          <p>Mobile Number: {selectedPatient.mobile_number}</p>

          {selectedPatient.emergency_contact ? (
            <div>
              <h2>Emergency Contact</h2>
              <p>Name: {selectedPatient.emergency_contact.full_name}</p>
              <p>Mobile Number: {selectedPatient.emergency_contact.mobile_number}</p>
              <p>Relation: {selectedPatient.emergency_contact.relation_to_the_patient}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {error && <p>{error}</p>}
    </div>
  );
};

export default SelectPatient;
