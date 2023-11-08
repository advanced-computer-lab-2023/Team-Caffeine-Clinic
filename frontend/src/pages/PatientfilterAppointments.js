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
            } 
          else{
            const data = await response.json();
            setResults(data); // Store fetched data in results state
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    return (
        <div className="container">
            <div className="input-container">
                <label htmlFor="date">Enter Date:</label>
                <input type="text" id="date" value={date} onChange={handleDateChange} />
            </div>

            <div className="input-container">
                <label htmlFor="status">Select Status:</label>
                <select id="status" value={status} onChange={handleStatusChange}>
                    <option value="">--Select Status--</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="rescheduled">Rescheduled</option>
                </select>
            </div>

            <div>
                {results && results.map((result, index) => (
                    <div key={index}>
                        <p>Doctor: {result.doctor}</p>
                        <p>Date: {result.appointmentDate}</p>
                        <p>Status: {result.status}</p>
                    </div>
                ))}
            </div>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AppointmentsComponent;
