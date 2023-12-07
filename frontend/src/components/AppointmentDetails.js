import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { useAuthContext } from '../hooks/useAuthContext';
import { useState } from 'react';

const AppointmentDetail = ({ appointment }) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen)
      setOpen(true)
    else
      setOpen(false)
  }

  return (
    <div className="doctor-details">
      <div className="name">
      </div>
      <div className="details"><strong>Doctor: </strong>{appointment.doctor}</div>
      <div className="details"><strong>Patient: </strong>{appointment.patient}</div>
      <div className="details"><strong>Date: </strong>{appointment.appointmentDate}</div>
      <div className="details"><strong>Status: </strong>{appointment.status}</div>

      <Popup closeOnDocumentClick={false} open={isOpen} trigger={<button>Add Perscription</button>} modal nested>
        <h4>Medicine: </h4><input type="text" />
        <button onClick={() => handleOpen()}>Add</button>
        <button onClick={() => handleOpen()}>Close</button>
      </Popup>
    </div>
  )
}

export default AppointmentDetail;