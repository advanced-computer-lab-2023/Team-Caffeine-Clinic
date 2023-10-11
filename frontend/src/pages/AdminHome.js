import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div className= "home">
            <h2>Admin Home</h2>
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
        </div>
    )
}

export default Home