import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const AppointmentDetail = ({ appointment }) => {

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
    // <div className="doctor-details">
    //   <div className="name">
    //   </div>
    //   <div className="details"><strong>Doctor: </strong>{appointment.doctor}</div>
    //   <div className="details"><strong>Patient: </strong>{appointment.patient}</div>
    //   <div className="details"><strong>Date: </strong>{appointment.appointmentDate}</div>
    //   <div className="details"><strong>Status: </strong>{appointment.status}</div>
    // </div>
    <div class="faq-list">
    <ul>
      <li data-aos="fade-up">
      <i class='bx bx-calendar-plus icon-help' ></i><a data-bs-toggle="collapse" class="collapse" data-bs-target="#faq-list-1"><strong>Doctor: </strong>{appointment.doctor}</a>
        <div id="faq-list-1" class="collapse show" data-bs-parent=".faq-list">
          <p>
          <strong>Patient: </strong>{appointment.patient}
          <br />
          <strong>Date: </strong>{convertDateFormat(appointment.appointmentDate)}
          <br />
          <strong>Status: </strong>{appointment.status}
          </p>
        </div>
      </li>
     </ul>
  </div>
  )
}

export default AppointmentDetail;