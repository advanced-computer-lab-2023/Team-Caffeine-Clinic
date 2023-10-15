import { useEffect, useState } from 'react'
import DoctorDetails from '../components/DoctorDetails';
import AppointmentDetail from '../components/AppointmentDetails';

const Appointments = () => {

    const [appointments, setAppointments] = useState(null);
    const [dateFilter, setDateFilter] = useState('');
    const [stateFilter, setstateFilter] = useState('');

    useEffect(() => {
      const fetchDoctors = async () => {
        let url = '/api/appointments';

        const params = new URLSearchParams();
        if (dateFilter) params.append('date', dateFilter);
        if (stateFilter) params.append('status', stateFilter);
        if (params.toString()) url += `?${params.toString()}`;

        console.log(url);

        const response = await fetch(url);
        const json = await response.json();

        if (response.ok) {
            setAppointments(json)
        }
      }
      fetchDoctors();
    }, [dateFilter, stateFilter])

    return (
      <div className="doctors">
        {/* Filter section */}
        <div className="filters">
          <input 
            type="text" 
            placeholder="Filter by Date" 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)} 
            className="filter-input"
          />
          <input 
            type="text" 
            placeholder="Filter by State" 
            value={stateFilter}
            onChange={(e) => setstateFilter(e.target.value)}
            className="filter-input" 
          />
        </div>

        {/* Doctors list */}
        <div className='doctors'>
          {appointments && appointments.map((appointment) => (
            <AppointmentDetail key={appointment._id} appointment={appointment} />
          ))}
        </div>
      </div>
  )
}

export default Appointments;