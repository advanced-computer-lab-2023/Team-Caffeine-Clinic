import { Link } from "react-router-dom"
import "../index.css"
import { useLogout } from '../hooks/useLogout'
import React, { useState, useEffect } from 'react';


const AdminNavbar =()=>{
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
  <h1 className="logo me-auto"><Link to="/AdminHome" style={linkStyle}>El7a2ne</Link></h1>
  <nav id="navbar" className="navbar order-last order-lg-0">
    <ul>
      <li><Link to="/AdminHome" className="nav-link scrollto active" href="">Home</Link></li>
      <li><Link to="/ViewAdmin" className="nav-link scrollto" href="">Admins</Link></li>
      <li className="dropdown"><a href="#" style={linkStyle}><span>Admin Name</span> <i className="bi bi-chevron-down"></i></a>
        <ul>
            <li><Link to="/admin/AdminChangePassword" style={linkStyle}>Change Password</Link></li>
            <li><Link style={linkStyle} to="/" onClick={handleClick}>Log Out</Link></li>
        </ul>
      </li>
    </ul>
    <i className="bi bi-list mobile-nav-toggle"></i>
  </nav>

  <Link to="/medicines" style={linkStyle} className="appointment-btn scrollto"><span className="d-none d-md-inline">Pharmacy</span></Link>

</div>
</header>





    )
}

export default AdminNavbar

// import { Link } from 'react-router-dom'
// import { useLogout } from '../hooks/useLogout'

// const AdminNavbar = () => {

//   const { logout } = useLogout()
  
//   const handleClick = () => {
//     logout()
//   }

//   return (
//     <header className="container navbar">
//       <Link to="/AdminHome" className='home-button'>Home</Link>
//       <div></div>
//       <Link onClick={handleClick} to="/" className='logout-button'>log out</Link>
//     </header>
//   )
// }

// export default AdminNavbar