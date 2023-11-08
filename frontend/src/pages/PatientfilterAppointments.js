import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const AppointmentsComponent = () => {
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const { user } = useAuthContext();
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, [date, status]);

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
                </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                {results &&
                    results.map((result, index) => (
                        <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }} key={index}>
                            <p>Doctor: {result.doctor}</p>
                            <p>Date: {result.appointmentDate}</p>
                            <p>Status: {result.status}</p>
                        </div>
                    ))}
            </div>

            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
        </div>
    );
};

export default AppointmentsComponent;
