import { Link } from "react-router-dom"
import "../index.css"


const DoctorNavbar =()=>{

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
                <Link className="doctor-buttons" to="/"><h3>log out</h3></Link>


            </div>
        </nav>
    )
}

export default DoctorNavbar