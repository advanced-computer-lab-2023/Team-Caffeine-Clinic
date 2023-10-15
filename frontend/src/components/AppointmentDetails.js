import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const AppointmentDetail = ({ appointment }) => {
  return (
    <div className="doctor-details">
      <div className="name">
      </div>
      <div className="details"><strong>Doctor: </strong>{appointment.doctor}</div>
      <div className="details"><strong>Patient: </strong>{appointment.patient}</div>
      <div className="details"><strong>Date: </strong>{appointment.appointmentDate}</div>
      <div className="details"><strong>Status: </strong>{appointment.status}</div>
    </div>
  )
}

export default AppointmentDetail;