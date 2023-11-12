import { useEffect, useState } from 'react'
import DoctorDetails from '../components/DoctorDetails';
import AppointmentDetail from '../components/AppointmentDetails';
import { useAuthContext } from "../hooks/useAuthContext";

const Appointments = () => {

    const [appointments, setAppointments] = useState(null);
    const [dateFilter, setDateFilter] = useState('');
    const [stateFilter, setstateFilter] = useState('');

    const user = useAuthContext()

    useEffect(() => {
      const fetchDoctors = async () => {
        let url = '/api/appointments';

        const params = new URLSearchParams();
        if (dateFilter) params.append('date', dateFilter);
        if (stateFilter) params.append('status', stateFilter);
        if (params.toString()) url += `?${params.toString()}`;

       
        

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${user.user.token}`
          }
        });
        const json = await response.json();

        if (response.ok) {
            setAppointments(json)
        }
      }
      if(user){
        fetchDoctors();
      }
    }, [dateFilter, stateFilter, user])

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