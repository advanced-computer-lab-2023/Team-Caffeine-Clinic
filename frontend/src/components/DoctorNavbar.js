import { Link } from "react-router-dom"
import "../index.css"
import { useLogout } from '../hooks/useLogout'


const DoctorNavbar =()=>{
    const { logout } = useLogout()

    const handleClick = () => {
        logout()
      }

    return(
        <nav>
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



            </div>
        </nav>
    )
}

export default DoctorNavbar