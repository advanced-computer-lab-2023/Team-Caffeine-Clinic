import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Diversity1 } from '@mui/icons-material';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import DoctorImage from '../assets/img/doctors/doctor.jpg';


const AppointmentsComponent = () => {
    const [allAppointments, setAllAppointments] = useState([]); // New state to hold all appointments
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const { user } = useAuthContext();
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const margin = {
        marginTop: '100px',
      }
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
            const response = await fetch(`/api/patient/getAppointments`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (!response.ok) {
                setError('Error fetching patient data.');
                setResults(null);
            } else {
                const data = await response.json();
                setAllAppointments(data); // Set all appointments
                filterAppointments(data); // Filter appointments based on date and status
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const filterAppointments = (appointments) => {
        const filtered = appointments.filter(appointment => 
            (!date || appointment.appointmentDate === date) &&
            (!status || appointment.status === status)
        );
        setResults(filtered);
    };

    const getUniqueDates = () => {
        const dates = allAppointments.map(appointment => appointment.appointmentDate);
        return [...new Set(dates)]; // Removes duplicates
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
<div className='doctorPage' style={margin}>
    <br />
        <div className="section-title">
          <h2>Appointments</h2>
        </div> 
            <div id="doctors" className="doctors">
            <div className='text-center'>
            <Link to="/doctors" className='button-43'>Book a new appointment</Link>
            </div>
            <div className="container">
                <div className="row">
                <div className="col-lg-8">
                    {results && results.map((result, index) => (
                        <div className="member mt-4 d-flex align-items-start" key={index}>
                            <div className="pic">
                            <img src={DoctorImage} className="img-fluid" alt="Doctor" />
                            </div>
                            <div className="member-info">
                            <h4 id='doctor-name'>Dr. {result.doctor.name}</h4>
                            <p className='status'> <strong>{result.status}</strong></p>
                            <div>
                            <p>Date: {result.appointmentDate}</p>
                            {/* <p>Date: {formatDateForDisplay(result.appointmentDate)}</p> */}
                            </div>
                            <br />
                            <br />
                            {!error ? (
  <button
    className="button-41"
    type="submit"
    onClick={() => refundAppointment(result.appointmentDate, result.doctor.username, result.transactionId)}
  >
    Refund
  </button>
) : (
  <p>You can't refund.</p>
)}                            </div>
                        </div>
                    ))}
                </div>

                {/* {error && <p className="error-message">{error}</p>} */}

            {/* Filters - occupies 4 columns */}
            <div className="col-lg-4  mt-4">

            <div className="filter-section">
            <div className="bx bx-filter filter-title" >
            Filters
            </div>
            <div>
                        <label htmlFor="date">Select Date:</label>
                        <select className="filter-input" id="date" value={date} onChange={handleDateChange}>
                            <option value="">None</option>
                            {getUniqueDates().map((uniqueDate, index) => (
                                <option key={index} value={uniqueDate}>{uniqueDate}</option>
                            ))}
                        </select>
                    </div>
                <div>
                    <label htmlFor="status">Select Status:</label>
                    <select className="filter-input" id="status" value={status} onChange={handleStatusChange}>
                        <option value="">None</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="rescheduled">Rescheduled</option>
                        <option value="FollowUp">FollowUp</option>
              </select>
                </div>
                </div>
                </div>
            </div>
            </div>
            </div>
            <br />
        </div>
    );
};

export default AppointmentsComponent;

