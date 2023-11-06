import { useAuthContext } from '../hooks/useAuthContext';

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
        <div className="Admin-details">
          <h4></h4>
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
          <p>{patient.createdAt}</p>
          <span onClick={handleClick}>Delete</span>
        </div>
      )
    }
    
    export default PatientDetails