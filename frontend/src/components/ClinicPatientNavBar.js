import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const NavBarPatient = () => {
  
  const linkStyle = {
    textDecoration: 'none',
 };

 const { logout } = useLogout()
 const handleClick = () => {
   logout()
 }

  // const [selectedPatient, setSelectedPatient] = useState(null);
  // const user = useAuthContext()


  // useEffect(() => {
  //   const fetchPatient = async () => {
  //     try {
  //       const response = await fetch('/api/patient/selectpatient', {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${user.user.token}`
  //         },
  //       });
  //       const data = await response.json();
  //       if (response.ok) {
  //         setSelectedPatient(data.patient);
  //       } else {
  //         throw new Error(data.error);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchPatient();
  // }, [user.user.token]); 

  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">
        <h1 className="logo me-auto"><a href="" style={linkStyle}>El7a2ne</a></h1>
        
        {/* <a href="index.html" className="logo me-auto"><img src="assets/img/logo.png" alt="" className="img-fluid"></a> */}
  
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li><a className="nav-link scrollto active" href="">Home</a></li>
            {/* <li><a className="nav-link scrollto" href="#about">About</a></li> */}
            {/* <li><a className="nav-link scrollto" href="#services">Services</a></li> */}
            {/* <li><a className="nav-link scrollto" href="#departments">Departments</a></li> */}
            <li><Link className="nav-link scrollto" to="/doctors">Doctors</Link></li>
            <li className="dropdown"><a href="#" style={linkStyle}><span>Patient's name</span> <i className="bi bi-chevron-down"></i></a>
              <ul>
                <li className="dropdown"><Link to="" style={linkStyle}><span>My Profile</span> <i className="bi bi-chevron-right"></i></Link>
                  <ul>
                  <li><Link to="/viewPatientsDetails" style={linkStyle}>Profile</Link></li>
                  <li><Link to="/PatientAddDocs" style={linkStyle}>Documents</Link></li>
                  <li><Link to="/patient/PatientChangePassword" style={linkStyle}>Change Password</Link></li>
                  </ul>
                </li>
                <li><Link to="/PatientfilterAppointments" style={linkStyle}>My Appointments</Link></li>
                <li><Link to="/Perscriptions" style={linkStyle}>My Prescriptions</Link></li>
                <li><Link to="/HealthPackages" style={linkStyle}>My Health Packages</Link></li>
                <li><Link to="/familyMembers" style={linkStyle}>My Family Members</Link></li>
                <li><Link to="/Filterbyavedates" style={linkStyle}>Filter by Availability Date</Link></li>
                <li><Link to="/" style={linkStyle} onClick={handleClick}>Logout</Link></li>
              </ul>
            </li>
            <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
  
        <Link to="/medicines" style={linkStyle} className="appointment-btn scrollto"><span className="d-none d-md-inline">Pharmacy</span></Link>
  
      </div>
    </header>
  )
}

export default NavBarPatient;
