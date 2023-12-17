import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const DoctorDetails = ({ doctor }) => {
  return (
    <div className="doctor-details">
      <div className="name">
        <Link to={`/doctor/getSingleDoctor/${doctor.username}`} className="doctor-link">
          Dr. {doctor.name}
        </Link>
      </div>
      <div className="details"><strong>speciality: </strong>{doctor.speciality}</div>
      <div className="details"><strong>session price: </strong>$d</div>
      <div className="details"><strong>affiliation: </strong>{doctor.affiliation}</div>
      <div className="details"><strong>education: </strong>{doctor.education}</div>
      <div className="details"><strong>rate: </strong>{doctor.originalRate}</div>
      <div className="details"><strong>email: </strong>{doctor.email}</div>
      
      <Link to={`/doctor/getSingleDoctor/${doctor.username}`} className="book-doctor-button">
          Book
        </Link>
    </div>
  )
}

export default DoctorDetails;