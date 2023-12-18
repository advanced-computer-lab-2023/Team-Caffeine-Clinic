import { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useNavigate } from 'react-router-dom';

const FollowUpRequests = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const [open, openModal] = useState(false)
    const [requests, setRequests] = useState(null);
    const [error, setError] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [newDate, setNewDate] = useState('');

    const toggleModal = () => {
        openModal(!open)
    };

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch('/api/doctorInfo/getFollowUpRequests', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();
                setRequests(data);
            } catch (err) {
                setError(err); // Fix the typo here
            }
        };

        if (user) {
            fetchRequests();
        }
    }, [user]);

    const handleReject = async (request) => {
        try {
            const response = await fetch('/api/doctorInfo/rejectRequest', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ request }),
            })
        } catch (error) {

        }
    }

    const handleSaveDate = async (request, patientId, date, olddate) => {
        const selectedDate = new Date(date);
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const hours = selectedDate.getHours();
        const minutes = selectedDate.getMinutes();

        const formattedDate1 = `${year}\\${month}\\${day}:${hours}:${minutes}`;
        const formattedDate = JSON.stringify(formattedDate1);
        console.log(olddate)
        try {

            const response = await fetch(`/api/doctorInfo/acceptFollowUPAppointment?patientId=${patientId}&date=${formattedDate}&olddate=${olddate}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ request }),
            });
            const data = await response.json();
            if (response.ok) {
                setResponseMessage(data.message);
                setNewDate(date);
                navigate('/')
            }
            else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    return (
        <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
            {error && <p style={{ color: 'red' }}>{error.message}</p>}
            {requests &&
                requests.map((request, index) => (
                    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }} key={index}>
                        <p>Patient: {request.patient}</p>
                        <p>Date: {request.appointment.appointmentDate}</p>

                        <Popup trigger=
                            {<button> Accept </button>}
                            modal nested>
                            <input
                                type="datetime-local"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                            />
                            <button onClick={() => { handleSaveDate(request._id, request.appointment.patient, newDate, request.appointment.appointmentDate) }}>
                                Accept
                            </button>
                        </Popup>

                        <button onClick={() => handleReject(request._id)}>Reject</button>
                    </div>
                ))}
        </div>
    );
};

export default FollowUpRequests;
