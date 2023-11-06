import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";

import DoctorDetails from '../components/DoctorDetails';


const Doctors = () => {

    const [doctors, setDoctors] = useState(null);
    const [nameFilter, setNameFilter] = useState('');
    const [specialityFilter, setSpecialityFilter] = useState('');

    const user = useAuthContext()

    useEffect(() => {
      const fetchDoctors = async () => {
        let url = 'http://localhost:4000/api/healthpackage/estimateRate';

        const params = new URLSearchParams();
        if (nameFilter) params.append('name', nameFilter);
        if (specialityFilter) params.append('speciality', specialityFilter);
        if (params.toString()) url += `?${params.toString()}`;

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${user.user.token}`
          }
        });
        const json = await response.json();

        if (response.ok) {
          setDoctors(json)
        }
      }
      
      if (user){
        fetchDoctors();
      }

    }, [nameFilter, specialityFilter, user])

    return (
      <div className="doctors">
        {/* Filter section */}
        <div className="filters">
          <input 
            type="text" 
            placeholder="Filter by name" 
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)} 
            className="filter-input"
          />
          <input 
            type="text" 
            placeholder="Filter by speciality" 
            value={specialityFilter}
            onChange={(e) => setSpecialityFilter(e.target.value)}
            className="filter-input" 
          />
        </div>

        {/* Doctors list */}
        <div className='doctors'>
          {doctors && doctors.map((doctor) => (
            <DoctorDetails key={doctor.username} doctor={doctor} />
          ))}
        </div>
      </div>
  )
}

export default Doctors;