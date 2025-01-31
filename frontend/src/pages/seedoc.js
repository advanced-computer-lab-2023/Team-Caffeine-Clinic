import React, { useState, useEffect } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';
import DoctorNavbar from '../components/DoctorNavbar.js';

const DoctorInfo = () => {

  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/doctorInfo/getDoctorByusername`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      });
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

  useEffect(() => {
    handleSearch();
  }, []); // Empty dependency array to trigger only on initial render

  return (
    <>
      <DoctorNavbar />
    {/* <div>
      <h1>Doctor Information</h1>
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
          <p>
            Available Dates:
            <ul>
              {doctor.availableDates &&
                doctor.availableDates.map((date, index) => (
                  <li key={index}>{date}</li>
                  ))}
            </ul>
          </p>
          <p>Wallet: {doctor.wallet}</p>
        </div>
      )}
    </div> */}
 {error && <p style={{ color: 'red' }}>{error}</p>}
      {doctor && (
<section id="hero" className="d-flex align-items-center">
  <div className="container">
    <h1>Welcome {doctor.username}</h1>
    <h2>Glad to have you back!</h2>
    <a href="#about" className="btn-get-started scrollto">Get Started</a>
  </div>
</section>
 )}

      </>
  );
};

export default DoctorInfo;
