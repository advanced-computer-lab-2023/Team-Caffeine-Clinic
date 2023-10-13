import React, { useState } from 'react';
import { useUsername } from './UsernameContext'; // Import the context hook

const DoctorInfo = () => {
  const { username, setUsername } = useUsername(); // Access the global username state

  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);
localStorage.setItem('username', username);
  const handleSearch = async () => {
    try {
      console.log(username);
      const response = await fetch(`/getDoctorByusername?userName=${username}`);
      if (!response.ok) {
        throw new Error('Doctor not found');
      }

      const data = await response.json();
      setDoctor(data[0]);
      setError(null);
    } catch (error) {
      setDoctor(null);
      setError('Doctor not found');
    }
  };

  return (
    <div>
      <h1>Doctor Information</h1>
      <div>
        <label>Enter Doctor's Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {doctor && (
        <div>
          <h2>Doctor Details</h2>
          <p>Username: {doctor.username}</p>
          <p>Name: {doctor.name}</p>
          <p>Speciality: {doctor.speciality}</p>
          <p>Rate: {doctor.rate}</p>
          <p>Affiliation: {doctor.affiliation}</p>
          <p>Email: {doctor.email || 'N/A'}</p>
          <p>Education: {doctor.education || 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default DoctorInfo;
