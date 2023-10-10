import React, { useState } from 'react';

const SelectPatient = () => {
  const [patientName, setPatientName] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [error, setError] = useState(null);

  const handleNameChange = (e) => {
    setPatientName(e.target.value);
  };

  const fetchSelectedPatient = async () => {
    try {
      const response = await fetch(`/selectpatient?name=${patientName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch patient');
      }
      const data = await response.json();
      setSelectedPatient(data.patient);
      setError(null);
    } catch (error) {
      setSelectedPatient(null);
      setError('Patient not found.');
    }
  };

  return (
    <div>
      <h1>Select a Patient</h1>
      <label htmlFor="patientNameInput">Patient Name:</label>
      <input
        type="text"
        id="patientNameInput"
        value={patientName}
        onChange={handleNameChange}
      />
      <button onClick={fetchSelectedPatient}>Select Patient</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {selectedPatient && (
        <div>
          <h2>Selected Patient</h2>
            <p>UserName: {selectedPatient.username}</p>
            <p>Name: {selectedPatient.name}</p>
            <p>Email: {selectedPatient.email}</p>
            <p>Date of birth: {selectedPatient.dob}</p>
            <p>Gender: {selectedPatient.gender}</p>
            <p>Mobile Number: {selectedPatient.mobile_number}</p>

            <h2>Emergency Contact</h2>
            <p>Name: {selectedPatient.emergencycontact.full_name}</p>
            <p>Mobile Number: {selectedPatient.emergencycontact.mobile_number}</p>
            <p>Relation: {selectedPatient.emergencycontact.relation_to_the_patient}</p>

            <h2>Health Records</h2>
            <ul>
            {selectedPatient.health_records.map((record, index) => (
                <li key={index}>{record}</li>
            ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default SelectPatient;
