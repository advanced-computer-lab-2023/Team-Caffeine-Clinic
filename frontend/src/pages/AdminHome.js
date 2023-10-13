import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className= "home">
            <h2>Admin Home</h2>
            <br />
            <div>
            <Link to="/AdminHome">
                      <button>View admins</button>
                </Link>
            <Link to="/viewDoctorApps">
                      <button>View Doctor Applications</button>
                </Link>
            <Link to="/viewDoctors">
                      <button>View Doctors</button>
                      </Link>
            <Link to="/viewHealthPacks">
                      <button>View Health Packages</button>
                </Link>
            <Link to="/viewPatients">
                      <button>View Patients</button>
                </Link>
            </div>
        </div>
    )
}

export default Home