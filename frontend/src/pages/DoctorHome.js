import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"

import { useAuthContext } from '../hooks/useAuthContext';

const DoctorHome = () => {

  const linkStyle = {
    textDecoration: 'none',
 };

 const doctorSection = {
  marginTop: '60px',
};
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
    <section id="services" className="services" style={doctorSection}>
    <div className="container">
      <div className="row">
        {/* Service Box 1 */}
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
          <div className="icon-box">
            <div className="icon"><i className="fas fa-filter"></i></div>
            <h4><Link to="/UpcomingAppointments" style={linkStyle}>Upcoming Appointments</Link></h4>
            <p>Easily manage and view your upcoming appointments, ensuring you're prepared for each patient visit.</p>
          </div>
        </div>

        {/* Service Box 2 */}
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
          <div className="icon-box">
            <div className="icon"><i className="fas fa-globe"></i></div>
            <h4><Link to="/DocAppointments" style={linkStyle}>All Appointments</Link></h4>
            <p>Access a comprehensive list of all scheduled appointments, including past and future engagements.</p>
          </div>
        </div>

        {/* Service Box 3 */}
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
          <div className="icon-box">
            <div className="icon"><i className="fas fa-hospital-user"></i></div>
            <h4><Link to="/ViewPatients" style={linkStyle}>My Patients</Link></h4>
            <p>Review and manage your patient list, access patient histories, and keep track of treatment plans.</p>
          </div>
        </div>

        {/* Service Box 4 */}
        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
            <div class="icon-box">
              <div class="icon"><i className="fas fa-book"></i></div>
              <h4><Link to="/seepatientdocs" style={linkStyle}>Documents</Link></h4>
              <p>Organize and view important patient documents, from medical reports to test results, all in one place.</p>
            </div>
          </div>

        {/* Service Box 5 */}
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
            <div class="icon-box">
              <div class="icon"><i className="fas fa-clock"></i></div>
              <h4><Link to="/AddAvailableDate" style={linkStyle}>Add Time Slots</Link></h4>
              <p>Set and manage your availability with ease, allowing patients to book appointments during your open time slots.</p>
            </div>
          </div>

        {/* Service Box 6 */}
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
            <div class="icon-box">
              <div class="icon"><i className="fas fa-notes-medical"></i></div>
              <h4><Link to="/follow-up" style={linkStyle}>Schedule a follow-up</Link></h4>
              <p>Ensure continuous patient care by easily scheduling follow-up appointments to track patient progress and recovery.</p>
            </div>
          </div>

      </div>

    </div>
  </section>
  );
};

export default DoctorHome;
