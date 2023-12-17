import { Link } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import Button from 'react-bootstrap/esm/Button';

const Results = ({ result }) => {
    const { user } = useAuthContext();
    const [isOpen, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [room, setRoom] = useState(null);

    const handleOpen = () => {
        setOpen((prevOpen) => !prevOpen);
    }

    const handleReschedule = async (date, appointment) => {
        try {
            const response = await fetch('/api/patient/reschedule', {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date, appointment }),
            })
            handleOpen()
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    }

    const contentStyle = {
        overflowY: 'auto', // Enable vertical scrolling
        width: '100vh',
        maxHeight: '100%', // Set maximum height
        padding: '20px', // Add padding as needed
        maxWidth: 'none', // Remove maximum width restriction
    };

    const handleFollowUpRequest = async (doctor, appointment) => {
        const response = await fetch('/api/patient/requestFollowUp', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ doctor, appointment }),
        })

        if (response.status === 500) window.alert('Already Requested Follow Up')
    }


    const refundAppointment = async (appointmentdate, doc, transactionID) => {
        try {
            const response = await fetch(`/api/patient/refundAppointment?appointmentdate=${appointmentdate}&doc=${doc}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (!response.ok) {
                setError('Error refunding appointment.');
            } else {
                // Optionally, you can update the state or perform any additional actions
                console.log('Appointment refunded successfully');
            }
        } catch (error) {
            console.error('Error refunding appointment:', error);
        }
    };

    const OpenNewWindowButton = async (doctor) => {
        try {
            const response = await fetch('/api/makeRoom', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ doctor }),
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data.room);
                setRoom(data.room)
            }
        } catch (error) {
            console.log(error);
        }



        const handleButtonClick = () => {
            // Replace 'https://example.com' with the desired URL
            if (room) {
                const url = `http://localhost:3000/room/${room}`;

                // Open a new window with the specified URL
                const width = 600;
                const height = 400;
                const left = window.innerWidth / 2 - width / 2;
                const top = window.innerHeight / 2 - height / 2;
                const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;
                window.open(url, '_blank', features);
            }
            else {
                window.alert('No Room')
            }
        };
        handleButtonClick();
    }
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <p>Doctor: {result.doctor.name}</p>
            <p>Date: {result.appointmentDate}</p>
            <p>Status: {result.status}</p>
            <button onClick={() => OpenNewWindowButton(result.doctor)}>Call Doctor</button>
            {result.status === 'completed' && <button onClick={() => handleFollowUpRequest(result.doctor, result._id)}>Follow-Up</button>}

            {result.status === 'upcoming' &&
                <div>

                    <button onClick={() => handleOpen(true)}>Reschedule</button>
                    <Popup open={isOpen} modal nested contentStyle={contentStyle} lockScroll>
                        <strong>Available Dates: </strong>
                        {result.doctor.availableDates && Array.isArray(result.doctor.availableDates) ? (
                            <ul>
                                {result.doctor.availableDates.map((date, index) => (
                                    <li key={index} style={{ marginBottom: '10px' }}>
                                        {date}{' '}
                                        <button onClick={() => handleReschedule(date, result._id)}>Reschedule</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            'No Dates available'
                        )}

                        <Button onClick={() => handleOpen()}>Close</Button>
                    </Popup>
                </div>}
            {(result.status === 'upcoming' || result.status === 'rescheduled')
                && <button onClick={() => refundAppointment(result.appointmentDate, result.doctor.username, result.transactionId)}>Refund</button>}

        </div>
    )
}

export default Results