import { Link } from "react-router-dom"
import "../index.css"
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
    
    <header id="header" className="fixed-top" >
<div className="container d-flex align-items-center">
  <h1 className="logo me-auto"><a href="" style={linkStyle}>El7a2ne</a></h1>
  
  {/* <a href="index.html" className="logo me-auto"><img src="assets/img/logo.png" alt="" className="img-fluid"></a> */}

  <nav id="navbar" className="navbar order-last order-lg-0">
    <ul>
      <li><a className="nav-link scrollto active" href="">Home</a></li>
      <li className="dropdown"><a href="#" style={linkStyle}><span>Dr. name</span> <i className="bi bi-chevron-down"></i></a>
        <ul>
          <li className="dropdown"><Link to="" style={linkStyle}><span>My Profile</span> <i className="bi bi-chevron-right"></i></Link>
            <ul>
            <li><Link to="/seedoc" style={linkStyle}>Profile</Link></li>
            <li><Link to="/doctor/DoctorChangePassword" style={linkStyle}>Change Password</Link></li>
            </ul>
          </li>
                <li><Link to="/EditDocRate" style={linkStyle}>  Edit Rate </Link></li>
                <li><Link to="/EditDocEmail" style={linkStyle}> Edit Email </Link></li>
                <li><Link to="/EditDocHos" style={linkStyle}> Edit hospital </Link></li>
                {/* <li><Link to="/ViewPatients" style={linkStyle}> View My patients </Link></li> */}
                <li><Link to="/UpcomingAppointments" style={linkStyle}> View My Upcoming Appointments </Link></li>
                <li><Link to="/SearchPatient" style={linkStyle} >Search a Patient</Link></li>
                {/* <li><Link to="/DocAppointments" style={linkStyle}>Appointments</Link></li>       */}
                {/* <li><Link to="/AddAvailableDate" style={linkStyle}>Add My Available Time Slots</Link></li> */}
                <li><Link to="/getAllHealthRecords" style={linkStyle}>Patient Health records</Link></li>
                <li><Link to="/follow-up" style={linkStyle}>schedule a follow-up for a patient</Link></li>
                <li><Link to="/seepatientdocs" style={linkStyle}>My Patietnts DOCS</Link></li>
                <li><Link to="/Docaddpatientdocs" style={linkStyle}>Add to my Patietnts DOCS</Link></li>
                <li><Link style={linkStyle} to="/" onClick={handleClick}>Log Out</Link></li>
        </ul>
      </li>
      <li><a className="nav-link scrollto active" href="">Home</a></li>

      <li><a className="nav-link scrollto active" href="">Home</a></li>
      <li><a className="nav-link scrollto active" href="">Home</a></li>

    </ul>
    <i className="bi bi-list mobile-nav-toggle"></i>
  </nav>

  <Link to="/medicines" style={linkStyle} className="appointment-btn scrollto"><span className="d-none d-md-inline">Pharmacy</span></Link>

</div>
</header>



/* <nav>
<div className="container">
    <Link className="doctor-buttons" to="/seedoc">
        <h1>DoctorPage</h1>
    </Link>


    <Link className="doctor-buttons" to="/EditDocRate"> <h3> Edit Rate </h3></Link>
    <Link className="doctor-buttons" to="/EditDocEmail"><h3> Edit Email </h3></Link>
    <Link className="doctor-buttons" to="/EditDocHos"><h3> Edit hospital </h3></Link>
    <Link className="doctor-buttons" to="/ViewPatients"><h3> View My patients </h3></Link>
    <Link className="doctor-buttons" to="/UpcomingAppointments"><h3> View My Upcoming Appointments </h3></Link>
    <Link className="doctor-buttons" to="/SearchPatient"><h3>Search a Patient</h3></Link>
    <Link className="doctor-buttons" to="/DocAppointments"><h3>Appointments</h3></Link>

    <Link className="doctor-buttons" to="/doctor/DoctorChangePassword"><h3>Change Password</h3></Link>
    
    
    <Link className="doctor-buttons" to="/" onClick={handleClick}><h3>Log Out</h3></Link>
    <Link className="doctor-buttons" to="/AddAvailableDate"><h3>Add My Available Time Slots</h3></Link>
    <Link className="doctor-buttons" to="/getAllHealthRecords"><h3>Patient Health records</h3></Link>
    <Link className="doctor-buttons" to="/follow-up"><h3>schedule a follow-up for a patient</h3></Link>
    <Link className="doctor-buttons" to="/seepatientdocs"><h3>My Patietnts DOCS</h3></Link>
    <Link className="doctor-buttons" to="/Docaddpatientdocs"><h3>Add to my Patietnts DOCS</h3></Link>





</div>
</nav> */

    )
}

export default DoctorNavbar