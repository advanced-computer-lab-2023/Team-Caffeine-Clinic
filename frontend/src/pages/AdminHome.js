import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import AdminNavbar from "../components/AdminNavbar";

const Home = () => {
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
      }

      const linkStyle = {
        textDecoration: 'none',
     };
    
     const doctorSection = {
      marginTop: '60px',
    };

    return (
<div>
<AdminNavbar />

<section id="services" className="services" style={doctorSection}>
    <div className="container">
      <div className="row">
        {/* Service Box 1 */}
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
          <div className="icon-box">
            <div className="icon"><i className="fas fa-filter"></i></div>
            <h4><Link to="/viewDoctors" style={linkStyle}>Doctors</Link></h4>
            <p>View and manage the list of doctors at your clinic, including their specialties,and schedules.</p>
          </div>
        </div>

        {/* Service Box 2 */}
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
          <div className="icon-box">
            <div className="icon"><i className="fas fa-globe"></i></div>
            <h4><Link to="/viewPharmacists" style={linkStyle}>Pharmacists</Link></h4>
            <p>Manage your team of pharmacists, oversee their duties, and maintain an efficient workflow in the pharmacy.</p>
          </div>
        </div>

        {/* Service Box 3 */}
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
          <div className="icon-box">
            <div className="icon"><i className="fas fa-hospital-user"></i></div>
            <h4><Link to="/viewPatientsAdmin" style={linkStyle}>Patients</Link></h4>
            <p>Access detailed patient profiles, medical histories, and treatment records to ensure high-quality care.</p>
          </div>
        </div>

        {/* Service Box 4 */}
        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
            <div class="icon-box">
              <div class="icon"><i className="fas fa-book"></i></div>
              <h4><Link to="/viewDoctorApps" style={linkStyle}>Doctor Applications</Link></h4>
              <p>Review and process applications from doctors seeking to join the clinic.</p>
            </div>
          </div>

        {/* Service Box 5 */}
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
            <div class="icon-box">
              <div class="icon"><i className="fas fa-clock"></i></div>
              <h4><Link to="/viewPharmacistApps" style={linkStyle}>Pharmacist Applications</Link></h4>
              <p>Evaluate and manage applications from pharmacists, ensuring the right expertise for pharmacy needs.</p>
            </div>
          </div>

        {/* Service Box 6 */}
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
            <div class="icon-box">
              <div class="icon"><i className="fas fa-notes-medical"></i></div>
              <h4><Link to="/viewHealthPacks" style={linkStyle}>Health Packages</Link></h4>
              <p>Oversee and manage various health care packages and customize offerings.</p>
            </div>
          </div>

      </div>
    </div>
</section>
</div>
    )
}

export default Home