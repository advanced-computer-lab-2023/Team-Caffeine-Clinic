import { useEffect, useState } from 'react'

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { useAuthContext } from '../hooks/useAuthContext';

const FamilyMemberDetails = ({ familyMember, relation }) => {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');

  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const { user } = useAuthContext()

  useEffect(() => {
    fetchAppointments(familyMember.username);
  }, [date, status]);

  const fetchAppointments = async (patient) => {
    try {
      const response = await fetch(`/api/patient/getAppointments?date=${date}&status=${status}&patient=${patient}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        setError('Error fetching patient data.');
        setResults(null);
      } else {
        const data = await response.json();
        setResults(data); // Store fetched data in results state
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const refundAppointment = async (appointmentdate,doc,transactionID) => {
    try {
        const response = await fetch(`/api/patient/refundAppointment?appointmentdate=${appointmentdate}&doc=${doc}&username=${familyMember.username}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        if (!response.ok) {
            setError('Error refunding appointment.');
        } else {
            // Optionally, you can update the state or perform any additional actions
            fetchAppointments(familyMember.username);
            console.log('Appointment refunded successfully');
        }
    } catch (error) {
        console.error('Error refunding appointment:', error);
    }
};

const handleFollowUpRequest = async(doctor, appointment) => {
  const response = await fetch('/api/patient/requestFollowUp', {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({doctor, appointment, patient: familyMember.username}),
  })

  if(response.status === 500) window.alert('Already Requested Follow Up')
}


  return (
    <Popup trigger={<div className='box'>
      <div className="name">{familyMember.name}</div>
      <div className="details"><strong>date of birth: </strong>{familyMember.dob}</div>
      <div className="details"><strong>gender: </strong>{familyMember.gender}</div>
      <div className="details"><strong>relation: </strong>{relation}</div>
    </div>} modal nested>

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            {(results) ?
              results.map((result, index) => (
                <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }} key={index}>
                  <p>Doctor: {result.name}</p>
                  <p>Date: {result.appointmentDate}</p>
                  <p>Status: {result.status}</p>
                  {result.status === 'completed' && <button onClick={() => handleFollowUpRequest(result.doctor, result._id)}>Follow-Up</button>}

                  {(result.status === 'upcoming' || result.status === 'rescheduled') 
                  && <button onClick={() => refundAppointment(result.appointmentDate,result.doctor,result.transactionId)}>Refund</button>}

                </div>
              )) : <div>No Appointments</div>}
          </div>

    </Popup>
  )
}

export default FamilyMemberDetails;