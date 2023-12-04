import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import DoctorDetails from '../components/DoctorDetails';

const Doctors = () => {
    const [doctors, setDoctors] = useState(null);
    const [nameFilter, setNameFilter] = useState('');
    const [specialityFilter, setSpecialityFilter] = useState('');
    const [doctorNames, setDoctorNames] = useState([]);
    const [specialities, setSpecialities] = useState([]);

    const user = useAuthContext();

    useEffect(() => {
      const fetchDoctors = async () => {
        let url = '/api/healthpackage/estimateRate';

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
          setDoctors(json);

          // Extracting unique names and specialties
          const names = new Set(json.map(doctor => doctor.name));
          const specialities = new Set(json.map(doctor => doctor.speciality));

          setDoctorNames([...names]);
          setSpecialities([...specialities]);
        }
      };
      
      if (user) {
        fetchDoctors();
      }

    }, [nameFilter, specialityFilter, user]);

    return (
      <div className="doctors">
        {/* Filter section */}
        <div className="filters">
          <select 
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="filter-input"
          >
            <option value="">Select Name</option>
            {doctorNames.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>

          <select 
            value={specialityFilter}
            onChange={(e) => setSpecialityFilter(e.target.value)}
            className="filter-input"
          >
            <option value="">Select Speciality</option>
            {specialities.map((speciality, index) => (
              <option key={index} value={speciality}>{speciality}</option>
            ))}
          </select>
          
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
