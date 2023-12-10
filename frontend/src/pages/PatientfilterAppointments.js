import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from 'react-bootstrap/esm/Button';
import Results from '../components/Results'

const AppointmentsComponent = () => {
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const { user } = useAuthContext();
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const [doctor, setDoctor] = useState(null);
    const [isOpen, setOpen] = useState(false);
    const [doctorIndex, setIndex] = useState(null)

    const handleOpen = () => {
        setOpen((prevOpen) => !prevOpen);
        console.log(isOpen);
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

    useEffect(() => {
        fetchAppointments();
    }, [date, status]);

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

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const fetchAppointments = async () => {
        try {
            const response = await fetch(`/api/patient/getAppointments?date=${date}&status=${status}`, {
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
                fetchAppointments();
                console.log('Appointment refunded successfully');
            }
        } catch (error) {
            console.error('Error refunding appointment:', error);
        }
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="date">Enter Date:</label>
                <input type="text" id="date" value={date} onChange={handleDateChange} />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="status">Select Status:</label>
                <select id="status" value={status} onChange={handleStatusChange}>
                    <option value="">--Select Status--</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="rescheduled">Rescheduled</option>
                    <option value="FollowUp">FollowUp</option>
                    <option value="completedAndFollwingUP">completedAndFollwingUP</option>
                </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                {results &&
                    results.map((result, index) => (
                        <div key={index}>
                            <Results
                            result={result} />
                        </div>
                    ))}
            </div>

            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
        </div>
    );
};

export default AppointmentsComponent;
