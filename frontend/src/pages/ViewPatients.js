import React, { useState, useEffect } from 'react';

const MyPatients = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  

  // Define the fetchDoctorPatients function
  const fetchDoctorPatients = async () => {
     // Indicate that data is being fetched
    setError(null); // Reset any previous errors

    // Retrieve the doctor's username from the session
    const storedUsername = localStorage.getItem('username');

    if (!storedUsername) {
      setError('No username found in session.');
      
      return;
    }

    try {
      const response = await fetch(`/myPatients/?doctorUsername=${storedUsername}`);
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }
      const data = await response.json();
      setPatients(data.patientUsernames); // Assuming the response format is correct
      
    } catch (error) {
      setPatients([]);
      setError('Failed to fetch patients');
      
    }
  };

  useEffect(() => {
    // Fetch patients when the component mounts
    fetchDoctorPatients();
  }, []);

  return (
    <div>
      <h1>My Patients</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {patients.length > 0 ? (
          patients.map((patientUsername, index) => (
            <li key={index}>{patientUsername}</li>
          ))
        ) : (
          <p>No patients found for this doctor.</p>
        )}
      </ul>
    </div>
  );
};

export default MyPatients;
