import { Link } from "react-router-dom"
// import '../style.css'
import { useLogout } from '../hooks/useLogout'
import React, { useState, useEffect } from 'react';


const DoctorNavbar =()=>{
    const { logout } = useLogout()

    const linkStyle = {
        textDecoration: 'none',
     };
    
     
    const handleClick = () => {
        logout()
      }

    return(


<div>

                <Link className="doctor-buttons" to="/doctor/DoctorChangePassword"><h3>Change Password</h3></Link>
                
                
                <Link className="doctor-buttons" to="/" onClick={handleClick}><h3>Log Out</h3></Link>
                <Link className="doctor-buttons" to="/AddAvailableDate"><h3>Add My Available Time Slots</h3></Link>
                <Link className="doctor-buttons" to="/getAllHealthRecords"><h3>Patient Health records</h3></Link>
                <Link className="doctor-buttons" to="/follow-up"><h3>schedule a follow-up for a patient</h3></Link>
                <Link className="doctor-buttons" to="/seepatientdocs"><h3>My Patietnts DOCS</h3></Link>
                <Link className="doctor-buttons" to="/Docaddpatientdocs"><h3>Add to my Patietnts DOCS</h3></Link>
                <Link className="doctor-buttons" to="/ClinicChats"><h3>Doctor Chats</h3></Link>

      <div id="topbar" className="d-flex align-items-center fixed-top">
  <div className="container d-flex justify-content-between">
    <div className="contact-info d-flex align-items-center">
      <i className="bi bi-envelope" /> <a href="mailto:contact@example.com">El7a2ni@gmail.com</a>
      <i className="bi bi-phone" /> +20 100 100 2921
    </div>
    <div className="d-none d-lg-flex social-links align-items-center">
      <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
      <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
      <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
      <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
    </div>
  </div>
</div>



 <header id="header" className="fixed-top">
  <div className="container d-flex align-items-center">
    <h1 className="logo me-auto"><a href="index.html">EL7A2NI</a></h1>
    {/* Uncomment below if you prefer to use an image logo */}
   {/* <a href="/seedoc" className="logo me-auto"><img src='../img/logo.png' alt='Logo' className="img-fluid" /></a> */}

    <nav id="navbar" className="navbar order-last order-lg-0">
      <ul>
        <li> <Link to="/DoctorHome"> Home </Link> </li>
        {/* <li><Link to="/ViewPatients">View My patients</Link></li> */}

        <li className="dropdown"><a><span>Appointments</span> <i className="bi bi-chevron-down" /></a>
          <ul>
            <li><Link to="/UpcomingAppointments">View My Upcoming Appointments</Link></li>
            <li><Link to="/AddAvailableDate">Add My Available Time Slots</Link></li>
            <li><Link to="/follow-up">schedule a follow-up for a patient</Link></li>
            <li><Link to="/FollowUpRequests">Accept/Reject Follow-Up Request</Link></li>
            <li><Link to="/DocAppointments">Appointments</Link></li>
          </ul>
        </li>

        <li className="dropdown"><a><span>Patients</span> <i className="bi bi-chevron-down" /></a>
          <ul>
            <li><Link to="/ViewPatients"> View My patients </Link></li>
             <li className="dropdown"><a><span>Patient Documents</span> <i class="bi bi-chevron-right"></i></a>
              <ul>
                <li><Link to="/seepatientdocs">View Patietnts DOCS</Link></li>
                <li><Link to="/Docaddpatientdocs"> Add to my Patietnts DOCS </Link></li>
              </ul>
            </li>
          </ul>
        </li>

        <li className="dropdown"><a><span>My Profile</span> <i className="bi bi-chevron-down" /></a>
          <ul>
            <li><Link to="/EditDocHos">Edit hospital</Link></li>
            <li className="dropdown"><Link to="/EditDocRate">Edit Rate</Link> </li>
            <li><Link to="/EditDocEmail">Edit Email</Link></li>
            <li><Link to="/doctor/DoctorChangePassword">Change Password</Link></li>
          </ul>
        </li>
      </ul>
      <i className="bi bi-list mobile-nav-toggle" />
    </nav>{/* .navbar */}
 <Link className="appointment-btn scrollto" to="/" onClick={handleClick}>Log Out</Link>  </div>
</header>

</div>
    )
}

export default DoctorNavbar