import React, { useEffect, useState } from 'react';
import AppointmentDetail from '../components/AppointmentDetails';
import { useAuthContext } from '../hooks/useAuthContext';

const AppointmentDoc = () => {
  const [appointments, setAppointments] = useState(null);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const { user } = useAuthContext();

  const margin = {
    marginTop: '100px',
  }

  useEffect(() => {
    let formattedDate = null;
    if(date){
    const selectedDate = new Date(date);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed months
    const day = selectedDate.getDate();
    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();

    formattedDate = `${year}\\${month}\\${day}:${hours}:${minutes}`;
    }
    
    const fetchAppointments = async (e) => {
      let url = 'api/doctorInfo/appointments';

      const params = new URLSearchParams();
      if (date) params.append('date', formattedDate);
      if (status) params.append('status', status);
      if (params.toString()) url += `?${params.toString()}`;

      try {
        const response = await fetch(
          url,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        console.log("dateFilter");

        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          // Handle error here
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, [date, status, user]);

  return (
    // <div className="doctors">
    //     {/* Filter section */}
    //     <div className="filters">
    //         <input
    //             type="text"
    //             placeholder="Filter by Date"
    //             value={date}
    //             onChange={(e) => setDate(e.target.value)}
    //             className="filter-input"
    //         />
    //         <select value={status} onChange={(e) => setStatus(e.target.value)} className="filter-input">
    //             <option value="">--Select Status--</option>
    //             <option value="upcoming">Upcoming</option>
    //             <option value="completed">Completed</option>
    //             <option value="cancelled">Cancelled</option>
    //             <option value="rescheduled">Rescheduled</option>
    //             <option value="FollowUp">FollowUp</option>
    //         </select>
    //     </div>

    //     {/* Appointments list */}
    //     <div className="appointments">
    //         {appointments &&
    //             appointments.map((appointment) => (
    //                 <AppointmentDetail key={appointment._id} appointment={appointment} />
    //             ))}
    //     </div>
    // </div>
    <div>
      <section className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>View All Upcoming Appointments</h2>
            <ol>
              <li><a href="index.html">Home</a></li>
              <li>All Upcoming Appointments</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="inner-page">
        <div className="container">
          <section id="faq" className="faq section-bg">
            <div className="container">
              <div className="section-title">
                <h2>All Upcoming Appointments</h2>
              </div>
              <div className="filters">
                <input
                  type="datetime-local"
                  placeholder="Filter by Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
                  <option value="">--Select Status--</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rescheduled">Rescheduled</option>
                  <option value="FollowUp">FollowUp</option>
                </select>
                <br />
              </div>

              <div className="faq-list">
                {appointments && appointments.map((appointment) => (
                  <AppointmentDetail key={appointment._id} appointment={appointment} />
                ))}
              </div>
            </div></section>
        </div>
      </section>
    </div>
  );
};

export default AppointmentDoc;
