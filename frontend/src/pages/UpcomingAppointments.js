import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';


const PatientsWithUpcomingAppointments = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  const {user} = useAuthContext()


  useEffect(() => {
    // Retrieve the doctor's username from the session
    // const storedUsername = localStorage.getItem('username');

    // if (!storedUsername) {
    //   setError('No username found in session.');
    //   return;
    // }

    // Make an API request to fetch patients with upcoming appointments
    const fetchPatientsWithAppointments = async () => {
      try {
        const response = await fetch(`/api/doctorInfo/patientsWithUpcomingAppointments`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch patients with upcoming appointments');
        }
        const data = await response.json();
        setPatients(data);
        setError(null);
      } catch (error) {
        setPatients([]);
        setError('Failed to fetch patients with upcoming appointments');
      }
    };
    if(user){
      fetchPatientsWithAppointments();
    }
  }, [user]);

  return (
    <div>
      <h1>Patients with Upcoming Appointments</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ol>
        {patients.map((patient, index) => (
          <li key={index}>{` ${patient.name} - Appointment Date: ${patient.appointmentDate}`}</li>
        ))}
      </ol>
    </div>
  );
};

export default PatientsWithUpcomingAppointments;
