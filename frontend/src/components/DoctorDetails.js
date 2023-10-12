const DoctorDetails = ({ doctor }) => {
  return (
    <div className="doctor-details">
      <div className="name">{doctor.name}</div>
      <div className="details"><strong>speciality: </strong>{doctor.speciality}</div>
      <div className="details"><strong>rate: </strong>{doctor.rate}</div>
      <div className="details"><strong>affiliation: </strong>{doctor.affiliation}</div>
      <div className="details"><strong>email: </strong>{doctor.email}</div>
      <div className="details"><strong>education: </strong>{doctor.education}</div>
    </div>
  )
}

export default DoctorDetails;