import { useAuthContext } from '../hooks/useAuthContext';

const DoctorDetails = ({ doctor }) => {

  const {user} = useAuthContext()


    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/api/Admin/deleteDoctor/' + doctor._id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
        window.location.reload();
    }


return ( 
        <>
    <div className="Admin-details" >
        <h4></h4>
        <p><strong>Username: </strong>{doctor.username}</p>
        <p><strong>Email: </strong>{doctor.email}</p>
        <p><strong>Name: </strong>{doctor.name}</p>
        <p><strong>Speciality: </strong>{doctor.speciality}</p>
        <p><strong>Rate: </strong>{doctor.rate}</p>
        <p><strong>Affiliation: </strong>{doctor.affiliation}</p>
        <p><strong>Education: </strong>{doctor.education}</p>
        <p><strong>Available Dates: </strong>{doctor.availableDates}</p>
        <p><strong>Patients: </strong>{doctor.patients}</p>
        <p>{doctor.createdAt}</p>
        <span onClick={handleClick}>Delete</span>
    </div>
    <br />
    </>
        )
  }
  
  export default DoctorDetails