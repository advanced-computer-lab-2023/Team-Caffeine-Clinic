import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';

const AppointmentDetail = ({ appointment }) => {
  const [isOpen, setOpen] = useState(false);
  const [medicine, setMedicine] = useState("");
  const [test, setTests] = useState("");
  const [symptom, setSymptoms] = useState("");
  const [advice, setAdvice] = useState("");
  const [details, setDetails] = useState("");

  const user = useAuthContext()

  useEffect(() => {
    const fetchName = async () => {
        // Construct the URL with the doctorID
        const url = `/api/doctorInfo/getPerscDetails/`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({appointment: appointment._id}),
        });
        if (!response.ok) {
          console.log('Error fetching prescription data');
          return; // Handle the error appropriately
        }

        const json = await response.json();
        setDetails(json);

    };
    if (user) {
      fetchName();
    }
  }, [user]);

  const handleOpen = () => {
    if (!isOpen)
      setOpen(true)
    else
      setOpen(false)
  }

  const handleAddAppointment = async () => {
    const medicines = medicine.split(',')
    const tests = test.split(',')
    const symptoms = symptom.split(',')
    const response = await fetch('/api/doctorInfo/addPerscription', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${user.user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appointment: appointment._id, patient: appointment.patient, medicine: medicines, tests: tests, symptoms: symptoms, advice: advice }),
    })
    handleOpen()
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
        <h4>Medicine: </h4><input type="text" value={medicine} onChange={(e) => setMedicine(e.target.value)} />
        <h4>Symptoms: </h4><input type="text" value={symptom} onChange={(e) => setSymptoms(e.target.value)} />
        <h4>Tests: </h4><input type="text" value={test} onChange={(e) => setTests(e.target.value)} />
        <h4>Advice: </h4><input type="text" value={advice} onChange={(e) => setAdvice(e.target.value)} />
        <button onClick={() => handleAddAppointment()}>Add</button>
        <button onClick={() => handleOpen()}>Close</button>
      </Popup>
    </div>
  )
}

export default AppointmentDetail;