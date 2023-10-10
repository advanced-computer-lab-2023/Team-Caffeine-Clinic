import { Link } from "react-router-dom"
import "../CSS/Navbar.css"; // Import the CSS file


const Navbar =()=>{

    return(
        <nav>
            <div className="container">
                <Link to="/seedoc">
                    <h1>DoctorPage</h1>
                </Link>


                <Link to="/EditDocRate"> <h3> Edit Rate </h3></Link>
                <Link to="/EditDocEmail"><h3> Edit Email </h3></Link>
                <Link to="/EditDocHos"><h3> Edit hospital </h3></Link>
                <Link to="/ViewPatients"><h3> View My patients </h3></Link>
                <Link to="/UpcomingAppointments"><h3> View My Upcoming Appointments </h3></Link>
                <Link to="/SearchPatient"><h3>Search a Patient</h3></Link>

            </div>
        </nav>
    )
}

export default Navbar