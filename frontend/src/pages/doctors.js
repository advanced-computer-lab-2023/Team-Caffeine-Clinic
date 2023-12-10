import { useEffect, useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext";
import DoctorDetails from '../components/DoctorDetails';
import DoctorImage from '../assets/img/doctors/doctor.jpg';

const Doctors = () => {
  const linkStyle = {
    textDecoration: 'none',
 };
    const [dateFilter, setDateFilter] = useState('');
    const [availableDates, setAvailableDates] = useState([]);
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
        console.log("API Response:", json); // Add this line to log the response
        
        if (response.ok) {
          setDoctors(json);

          // Extracting unique names and specialties
          const names = new Set(json.map(doctor => doctor.name));
          const specialities = new Set(json.map(doctor => doctor.speciality));

          const dates = new Set();
          json.forEach(doctor => {
            doctor.availableDates?.forEach(date => dates.add(date));
        });
          setAvailableDates([...dates]);

          setDoctorNames([...names]);
          setSpecialities([...specialities]);
        }
      };
      
      if (user) {
        fetchDoctors();
      }

    }, [nameFilter, specialityFilter, dateFilter, user]); 

    return (



        // <div className='doctors'>
        //   {doctors && doctors.map((doctor) => (
        //     <DoctorDetails key={doctor.username} doctor={doctor} />
        //   ))}
        // </div>
<div>
<div className="filters">
          <select 
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="filter-input"
          >
            <option value="">Select Name</option>
            {doctorNames.map((name, index) => (
              <option key={index} value={name}>Dr. {name}</option>
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

            {/* Date Filter */}
          <select 
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="filter-input"
                >
                    <option value="">Select Date</option>
                    {availableDates.map((date, index) => (
                        <option key={index} value={date}>{date}</option>
                    ))}
            </select>
          
</div>

{doctors && doctors.map((doctor) => (
<body>
<div id="doctors" className="doctors">
      <div className="container">
  
        <div className="row">
          
          <div className="col-lg-6 mt-4">
            <div className="member d-flex align-items-start">
              <div className="pic"><img src={DoctorImage} className="img-fluid" alt="Doctor" /></div>
              <div className="member-info">
                <h4>Dr. {doctor.name}</h4>
                <span>{doctor.speciality}</span>
                <p>Fees: {doctor.rateAfterDiscount} EGP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</body>
))}
</div>
    )
}

export default Doctors;
