

import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const [dateTime, setDateTime] = useState('');

  const user = useAuthContext()

  const fetchDoctorsByAvailability = async () => {
    try {
      //console.log(user)
      const response = await fetch(`/api/patient/filterDoctorsByAvailability?date=${dateTime}`, {
        headers: {
          'Authorization': `Bearer ${user.user.token}`
        }
      }, [user]);
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error('Error fetching doctors by availability:', error);
    }
  };

  useEffect(() => {
    //console.log(user);
    if (dateTime && user) {
      fetchDoctorsByAvailability();
    }
  }, [dateTime, user]);

  // Define your CSS styles here
  const containerStyle = {
    margin: '100px',
    padding: '100px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f8f8f8',
    width: '800px', // Adjust the width as needed
  };

  const inputContainerStyle = {
    marginBottom: '10px',
  };

  const doctorBoxStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    backgroundColor: '#fff',
    width:'100px',
    
  };

  const doctorNameStyle = {
    fontSize: '18px',
    margin: '0',
    padding: '0',
  };

  const doctorInfoStyle = {
    fontSize: '14px',
    margin: '5px 0',
    color: '#555',
  };

  return (
    <div>
      <h2>Doctors Available on a Specific Date and Time</h2>
      <div style={containerStyle} className="container">
        <div style={inputContainerStyle} className="input-container">
          <input
            type="datetime-local" // Use datetime-local input for date and time
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
          />
        </div>
        <div>
          {doctors.map((doctor) => (
            <div key={doctor.username} style={doctorBoxStyle} className="doctor-box">
              <h3 style={doctorNameStyle} className="doctor-name">{doctor.name}</h3>
              <p style={doctorInfoStyle} className="doctor-info">Speciality: {doctor.speciality}</p>
              <p style={doctorInfoStyle} className="doctor-info">Affiliation: {doctor.affiliation}</p>
              <p style={doctorInfoStyle} className="doctor-info">Email: {doctor.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
