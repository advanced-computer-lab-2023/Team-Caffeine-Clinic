import { useAuthContext } from '../hooks/useAuthContext';
import DoctorImage from '../assets/img/doctors/doctor.jpg';


const PatientDetails = ({ patient }) => {
  const {user} = useAuthContext()

    const handleClick = async () => {
      const response = await fetch('/api/Admin/deletePatient/' + patient._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      window.location.reload();
  }
  
      return (
        <div id="doctors" className="doctors">
        <div className="container">
        <div className="row">
        <div className="col-lg">
       <div className="member d-flex align-items-start">
        <div className="pic">
          <img src={DoctorImage} className="img-fluid" alt="Doctor" />
        </div>
        <div className="member-info"> 
          <p><strong>Username: </strong>{patient.username}</p>
          <p><strong>Email: </strong>{patient.email}</p>
          <p><strong>Password: </strong>{patient.password}</p>
          <p><strong>Name: </strong>{patient.name}</p>
          <p><strong>Date of birth: </strong>{patient.dob}</p>
          <p><strong>Gender: </strong>{patient.gender}</p>
          <p><strong>Mobile Number: </strong>{patient.mobile_number}</p>
          {/* <p><strong>Emergency Contact: </strong></p> */}
          <p><strong>Emergency Contact Name: </strong>{patient.emergency_contact.full_name}</p>
          <p><strong>Emergency Contact Mobile Number: </strong>{patient.emergency_contact.mobile_number}</p>
          <p><strong>Emergency Contact Relation: </strong>{patient.emergency_contact.relation_to_the_patient}</p>
          <p><strong>Health Records: </strong>{patient.health_records}</p>
          <p><strong>Creation Date: </strong>{patient.createdAt}</p>
          <button onClick={handleClick} className="delete-btn">Delete</button>
          </div>
        </div>
        </div>
        </div>
        </div>
    <br />
    </div>      
    )
    }
    
    export default PatientDetails