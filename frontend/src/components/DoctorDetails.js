import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const DoctorDetails = ({ doctor }) => {
  return (
    <div className="doctor-details">
      <div className="name">
        <Link to={`/doctor/getSingleDoctor/${doctor.username}`} className="doctor-link">
          {doctor.name}
        </Link>
      </div>
      <div className="details"><strong>speciality: </strong>{doctor.speciality}</div>
      <div className="details"><strong>rate: </strong>{doctor.originalRate}</div>
      <div className="details"><strong>affiliation: </strong>{doctor.affiliation}</div>
      <div className="details"><strong>email: </strong>{doctor.email}</div>
      <div className="details"><strong>education: </strong>{doctor.education}</div>
      <div className="details"><strong>session price: </strong>{doctor.rateAfterDiscount + 0.1 * (doctor.rateAfterDiscount)}</div>
    </div>
  )
}

export default DoctorDetails;