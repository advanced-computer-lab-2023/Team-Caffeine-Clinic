import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';


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

    const formatDateForDisplay = (dateString) => {
        // Split the string with "\\" as the delimiter
        const dateParts = dateString.split("\\");
        if (dateParts.length >= 3) {
            // Extract year, month, and day
            const year = dateParts[0];
            const month = dateParts[1];
            const day = dateParts[2].split(':')[0]; // Splitting again to extract the day part
            return `${day}/${month}/${year}`; // Format: "DD/MM/YYYY"
        } else {
            return dateString; // Return original string if format is unexpected
        }
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
                setResults(data);
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
                fetchAppointments();
                console.log('Appointment refunded successfully');
            }
        } catch (error) {
            console.error('Error refunding appointment:', error);
        }
    };
    return (
        <div className="appointments-page">
            <div>
                            
            <Link to="/doctors" className='book-button'>Book an appointment</Link>

            </div>


            <div className="filter-container">
                <div>
                   <h2> <strong>Filter Results</strong></h2>
                </div>
                <div className="input-group">
                    <label htmlFor="date">Enter Date:</label>
                    <input type="date" id="date" value={date} onChange={handleDateChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="status">Select Status:</label>
                    <select id="status" value={status} onChange={handleStatusChange}>
                        <option value="">None</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rescheduled">Rescheduled</option>
              <option value="FollowUp">FollowUp</option>
              </select>
                </div>
            </div>

            <h1>
                Appointments:
            </h1>
      
            <div className="results-container">
                <div className="appointment-results">
                    {results && results.map((result, index) => (
                        <div className="appointment-item" key={index}>
                            <div>
                            <p className='status'> <strong>{result.status}</strong></p>
                            <p id='doctor-name'>Dr. {result.doctor}</p>
                            </div>

                            <div>
                            
                            <button className="refund-button" onClick={() => refundAppointment(result.appointmentDate, result.doctor, result.transactionId)}>
                                Refund
                            </button>
                            <p>{formatDateForDisplay(result.appointmentDate)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default AppointmentsComponent;

