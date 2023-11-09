import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'


const Home = () => {
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
      }

    return (
        <div className= "home">
            <h2>Admin Home</h2>
            <br />
            <div>
            <Link to="/ViewAdmin">
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
            <Link to="/employmentContract">
                      <button>View Employment Contracts</button>
                </Link>
                <Link to="/">
                      <button>Log Out</button>
                </Link>
            <Link to="/" onClick={handleClick}>
                      <button>log out</button>
                </Link>
            </div>
        </div>
    )
}

export default Home