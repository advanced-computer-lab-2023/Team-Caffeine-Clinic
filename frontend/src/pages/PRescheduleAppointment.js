import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const PRescheduleAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState('');
    const [newDate, setNewDate] = useState('');
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/patient/getAppointments', {   // Fetch patient's appointments
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setAppointments(data);
            if (data.length > 0) {
                setSelectedAppointment(data[0]._id); // Assuming each appointment has a unique '_id'
            }
        })
        .catch(error => {
            console.error('Error fetching appointments:', error);
            setError(error.toString());
        });
    }, [user.token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedAppointment || !newDate) {
            setError("Please select an appointment and a new date.");
            return;
        }

        // Format the date to YYYY-MM-DD if it's not already in that format
        const formatted = new Date(newDate);
        console.log(formatted);
        const year = formatted.getFullYear();
        const month = formatted.getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed months
        const day = formatted.getDate();
        const hours = formatted.getHours();
        const minutes = formatted.getMinutes();

        const formattedDate = `"${year}\\\\${month}\\\\${day}:${hours}:${minutes}"`;

        fetch('/api/patient/rescheduleAppointmentPatient', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({formattedDate, selectedAppointment})
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.log("lol");
                setError(data.error);
            } else {
                setNewDate('');
                setError(null);
                console.log('Appointment rescheduled successfully:', data);
                navigate('/home'); // Redirect to a relevant page after successful rescheduling
            }
        })
        .catch(error => {
            console.error('Error rescheduling appointment:', error);
            setError(error.toString());
        });
    };

    return (
        <div className="reschedule-appointment-page">
            <h2>Reschedule Appointment</h2>
            <form className="reschedule-appointment-form" onSubmit={handleSubmit}>
                <label htmlFor="selectedAppointment">Select Appointment:</label>
                <select
                    id="selectedAppointment"
                    value={selectedAppointment}
                    onChange={(e) => setSelectedAppointment(e.target.value)}
                    required
                >
                    {appointments.map(appointment => (
                        <option key={appointment._id} value={appointment._id}>
                            {appointment.patient} at {appointment.appointmentDate}
                        </option>
                    ))}
                </select>

                <label htmlFor="newDate">New Date:</label>
                <input
                    id="newDate"
                    type="datetime-local"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                />

                <button type="submit">Reschedule</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default PRescheduleAppointment;
