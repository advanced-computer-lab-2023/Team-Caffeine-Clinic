import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import DoctorImage from '../assets/img/doctors/doctor.jpg';


const DoctorDetails = ({ doctor }) => {
  const { user } = useAuthContext();
  const [patients, setPatients] = useState(doctor.patients || []);
  const margin = {
    marginTop: '130px',
  }
  const [showPatients, setShowPatients] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  
  const handleViewPatients = () => {
      setShowPatients(true);
      setFilteredPatients(doctor.patients);
  };
  
  const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      if (e.target.value === '') {
          setFilteredPatients(doctor.patients);
      } else {
          const filtered = doctor.patients.filter(patient => 
              patient.name.toLowerCase().includes(e.target.value.toLowerCase())
          );
          setFilteredPatients(filtered);
      }
  };


    const handleClick = async () => {
        const response = await fetch('/api/Admin/deleteDoctor/' + doctor._id, {
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
        <p><strong>Username: </strong>{doctor.username}</p>
        <p><strong>Email: </strong>{doctor.email}</p>
        <p><strong>Name: </strong>{doctor.name}</p>
        <p><strong>Speciality: </strong>{doctor.speciality}</p>
        <p><strong>Rate: </strong>{doctor.rate}</p>
        <p><strong>Affiliation: </strong>{doctor.affiliation}</p>
        <p><strong>Education: </strong>{doctor.education}</p>
        <p><strong>Available Dates: </strong>{doctor.availableDates && doctor.availableDates.length > 0 ? doctor.availableDates.join(', ') : 'Not available'}</p>
        <p><strong>Patients: </strong>{doctor.patients && doctor.patients.length > 0 ? doctor.patients.join(', '): 'No Patients'}</p>
        <p>{doctor.createdAt}</p>
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
  
  export default DoctorDetails