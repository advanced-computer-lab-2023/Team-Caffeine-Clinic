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

    const handleSaveDate = async (patientId, date, olddate) => {
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

           
              
              
              
            const response = await fetch(`/api/doctorInfo/createfollowUPAppointment?patientId=${patientId}&date=${formattedDate}&olddate=${olddate}`, {
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

    function convertDateFormat(inputDate) {
        // Replace double backslashes with a single backslash
        const cleanedDate = inputDate.replace(/\\\\/g, '\\');
      
        // Use a regular expression to extract date components
        const match = cleanedDate.match(/(\d+)\\(\d+)\\(\d+):(\d+):(\d+)/);
      
        if (!match) {
          return 'Invalid Date';
        }
      
        const [, year, month, day, hours, minutes] = match.map(component => parseInt(component, 10));
      
        // Check if the date components are valid
        if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hours) || isNaN(minutes)) {
          return 'Invalid Date';
        }
      
        // Construct the new date string in the desired format
        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
        return formattedDate;
      }

    return (
        // <div style={styles.container}>
        //     <h2>Completed Appointments for Doctor {doctorId}</h2>
        //     {completedAppointments.map((appointment, index) => (
        //         <div style={styles.listItem} key={index}>
        //             <p>Patient: {appointment.patient}</p>
        //             {editedAppointment === index ? (
        //                 <div style={styles.inputField}>
        //                     <input
        //                         type="datetime-local"
        //                         value={newDate}
        //                         onChange={(e) => setNewDate(e.target.value)}
        //                     />
        //                     <button onClick={() => handleSaveDate(appointment.patient, newDate,appointment.appointmentDate) }>
        //                         Save
        //                     </button>
        //                     <button onClick={handleCancelEdit}>Cancel</button>
        //                 </div>
        //             ) : (
        //                 <p>Date: {appointment.appointmentDate}</p>
        //             )}
        //             <button onClick={() => handleEditDate(index, appointment.appointmentDate)}>Edit Date</button>
        //         </div>
        //     ))}
        //     {responseMessage && <div>{responseMessage}</div>}
        // </div>
        <div>
  <section className="breadcrumbs">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2>View Upcoming Appointments</h2>
        <ol>
          <li><a href="index.html">Home</a></li>
          <li>Upcoming Appointments</li>
        </ol>
      </div>
    </div>
  </section>
  <section className="inner-page">
    <div className="container">
    <section id="faq" className="faq section-bg">
  <div className="container">
    <div className="section-title">
      <h2>Your Completed Appointments</h2>
    </div>
    <div className="faq-list">
    {completedAppointments.map((appointment, index) => (
      <ul>
        <li data-aos="fade-up">
        <i class='bx bx-calendar-plus icon-help' ></i> <a data-bs-toggle="collapse" className="collapse" data-bs-target="#faq-list-1" key={index}>Patient: {appointment.patient}</a>
          <div id="faq-list-1" className="collapse show" data-bs-parent=".faq-list">
                     {editedAppointment === index ? (
                        <div style={styles.inputField}>
                            <input
                                type="datetime-local"
                                className="form-control"
                                value={newDate}
                                onChange={(e) => setNewDate(e.target.value)}
                            />
                            <button onClick={() => handleSaveDate(appointment.patient, newDate,appointment.appointmentDate) }>
                                Save
                            </button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    ) : (
                        <p>Date: {convertDateFormat(appointment.appointmentDate)}</p>
                    )}
                    <button onClick={() => handleEditDate(index, appointment.appointmentDate)}>Edit Date</button>
          </div>
        </li>
      </ul>
            ))}
             {responseMessage && <div>{responseMessage}</div>}
        </div>
  </div></section>
    </div>
  </section>
</div>

    );
};

export default CompletedAppointments;
