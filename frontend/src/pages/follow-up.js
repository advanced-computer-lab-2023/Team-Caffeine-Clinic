import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

const CompletedAppointments = ({ doctorId }) => {
    const [completedAppointments, setCompletedAppointments] = useState([]);
    const [editedAppointment, setEditedAppointment] = useState(null);
    const [newDate, setNewDate] = useState('');
    const [initialDate, setInitialDate] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const user = useAuthContext();

    useEffect(() => {
        const fetchCompletedAppointments = async () => {
            try {
                const response = await fetch(`/api/doctorInfo/getCompletedAppointmentsForDoctor`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.user.token}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setCompletedAppointments(data);
                } else {
                    throw new Error(data.error);
                }
            } catch (error) {
                console.error('Error fetching completed appointments:', error);
            }
        };

        fetchCompletedAppointments();
    }, [doctorId, responseMessage]);

    const handleEditDate = (index, date) => {
        setEditedAppointment(index);
        setInitialDate(date);
        setNewDate(date);
    };

    const handleSaveDate = async (patientId, date,olddate) => {
        const selectedDate = new Date(date);
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const hours = selectedDate.getHours();
        const minutes = selectedDate.getMinutes();

        const formattedDate = `${year}/${month}/${day}:${hours}:${minutes}`;

        try {

            const chnage = await  fetch(
                `/api/doctorInfo/changeToFollowUp?patientId=${patientId}&date=${olddate}`, 
                {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.user.token}`
                  },
                }
              );

              
              
              
            const response = await fetch(`/api/doctorInfo/createfollowUPAppointment?patientId=${patientId}&date=${formattedDate}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.user.token}`
                },
            });
            const data = await response.json();
            if (response.ok) {
                setResponseMessage(data.message);
                setEditedAppointment(null);
                setNewDate(initialDate);
            } 
            else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditedAppointment(null);
        setNewDate(initialDate);
    };

    // Internal CSS for styling
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px',
        },
        listItem: {
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px',
            width: '50%',
            textAlign: 'left',
        },
        inputField: {
            display: 'inline',
        },
    };

    return (
        <div style={styles.container}>
            <h2>Completed Appointments for Doctor {doctorId}</h2>
            {completedAppointments.map((appointment, index) => (
                <div style={styles.listItem} key={index}>
                    <p>Patient: {appointment.patient}</p>
                    {editedAppointment === index ? (
                        <div style={styles.inputField}>
                            <input
                                type="datetime-local"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                            />
                            <button onClick={() => handleSaveDate(appointment.patient, newDate, appointment.appointmentDate) }>
                                Save
                            </button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    ) : (
                        <p>Date: {appointment.appointmentDate}</p>
                    )}
                    <button onClick={() => handleEditDate(index, appointment.appointmentDate)}>Edit Date</button>
                </div>
            ))}
            {responseMessage && <div>{responseMessage}</div>}
        </div>
    );
};

export default CompletedAppointments;
