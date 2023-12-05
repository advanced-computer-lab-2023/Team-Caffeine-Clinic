import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const RescheduleAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState('');
    const [newDate, setNewDate] = useState('');
    const [error, setError] = useState(null);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/doctorInfo/appointments', { // Updated route
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
        const formattedDate = new Date(newDate).toISOString().split('T')[0];
    
        const appointmentData = {
            appointmentId: selectedAppointment,
            newDate: formattedDate
        };
    
        fetch('/api/doctorInfo/rescheduleAppointment', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(appointmentData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setNewDate('');
                setError(null);
                console.log('Appointment rescheduled successfully:', data);
                navigate('/doctor/DocRescheduleAppointment'); // Redirect to a relevant page
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
                            {appointment.patientName} at {appointment.appointmentDate}
                        </option>
                    ))}
                </select>

                <label htmlFor="newDate">New Date:</label>
                <input
                    id="newDate"
                    type="date"
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

export default RescheduleAppointment;
