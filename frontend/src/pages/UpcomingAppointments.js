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

  function convertDateFormat(inputDate) {
    // Replace double backslashes with a single backslash
    const cleanedDate = inputDate.replace(/\\\\/g, '\\');
  
    // Use a regular expression to extract date components
    const match = cleanedDate.match(/(\d+)\\(\d+)\\(\d+):(\d+):(\d+)/);
  
    if (!match) {
      return 'Invalid Date';
    }
  
    const [, year, month, day, hours, minutes] = match.map(component => parseInt(component, 10));
  
    // Check if the date components are valid
    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hours) || isNaN(minutes)) {
      return 'Invalid Date';
    }
  
    // Construct the new date string in the desired format
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
    return formattedDate;
  }

  return (
    // <div>
    //   <h1>Patients with Upcoming Appointments</h1>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    //   <ol>
    //     {patients.map((patient, index) => (
    //       <li key={index}>{` ${patient.patient} - Appointment Date: ${patient.appointmentDate}`}</li>
    //     ))}
    //   </ol>
    // </div>
<div>
  <section className="breadcrumbs">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2>View Upcoming Appointments</h2>
        <ol>
          <li><a href="index.html">Home</a></li>
          <li>Upcoming Appointments</li>
        </ol>
      </div>
    </div>
  </section>
  <section className="inner-page">
    <div className="container">
    <section id="faq" className="faq section-bg">
  <div className="container">
    <div className="section-title">
      <h2>Patients With Upcoming Appointments</h2>
    </div>
    <div className="faq-list">
    {patients.map((patient, index) => (
      <ul>
        <li data-aos="fade-up">
        <i class='bx bx-calendar-plus icon-help' ></i> <a data-bs-toggle="collapse" className="collapse" data-bs-target="#faq-list-1" key={index}>Patient: {patient.patient}</a>
          <div id="faq-list-1" className="collapse show" data-bs-parent=".faq-list">
            <p>
             Appointment Date: {convertDateFormat(patient.appointmentDate)}
            </p>
          </div>
        </li>
      </ul>
            ))}
        </div>
  </div></section>
    </div>
  </section>
</div>


  );
};

export default PatientsWithUpcomingAppointments;
