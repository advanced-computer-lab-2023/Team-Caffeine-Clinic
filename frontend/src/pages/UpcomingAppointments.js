import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';


const PatientsWithUpcomingAppointments = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  const {user} = useAuthContext()


  const fetchAppointments = async () => {
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

  const refundAppointment = async (appointmentdate, patient, transactionID) => {
    try {
        const response = await fetch(`/api/doctorInfo/refundAppointment?appointmentdate=${appointmentdate}&patient=${patient}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (!response.ok) {
            setError('Error refunding appointment.');
        } else {
            // Optionally, you can update the state or perform any additional actions
            window.alert('Appointment cancelled successfully')
            fetchAppointments();
            console.log('Appointment refunded successfully');
        }
    } catch (error) {
        console.error('Error refunding appointment:', error);
    }
};


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
      {patients &&
              patients.map((result, index) => (
                <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }} key={index}>
                  <p>Patient: {result.patient}</p>
                  <p>Date: {result.appointmentDate}</p>
                  <p>Status: {result.status}</p>
                  {result.status === 'completed' && <button>Follow-Up</button>}

                  {(result.status === 'upcoming' || result.status === 'rescheduled') 
                  && <button onClick={() => refundAppointment(result.appointmentDate,result.patient,result.transactionId)}>Cancel</button>}

                </div>
              ))}
      </ol>
    </div>
  );
};

export default PatientsWithUpcomingAppointments;
