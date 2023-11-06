import HealthPackDetails from '../components/HealthPackDetails';
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useEffect, useState } from 'react';

const HealthPackages = () => {
  const [healthPackages, setHealthPackages] = useState([]);
  const [error, setError] = useState(null);

  const user = useAuthContext()

  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const response = await fetch('/api/healthpackage', {
          headers: {
            'Authorization': `Bearer ${user.user.token}`
          }
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Could not fetch health packages.");
        }

        setHealthPackages(data);
      } catch (err) {
        setError(err.message);
      }
    };
    if(user){
      fetchHealthPackages();
    }
  }, [user]);

  return (
    <div className="health-packages">
      <h1>Available Health Packages</h1>

      {error && <p className="error-message">{error}</p>}

      {healthPackages.length === 0 ? (
        <p>No health packages available.</p>
      ) : (
        <ul>
          {healthPackages.map((hp) => (
            <li key={hp.name}>
              <div className='name'>{hp.name}</div>
              <div>description: {hp.description}</div>
              <div>Services Included: {hp.servicesIncluded}</div>
              <div>basePrice: {hp.basePrice}</div>
              <div>Doctor Session Discount: {hp.discounts.doctorSession * 100}%</div>
              <div>Medicine Discount: {hp.discounts.pharmacyMedicine * 100}%</div>
              <div>Family Member Discount: {hp.discounts.familySubscription * 100}%</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HealthPackages;


// const HealthPackages = () => {

//     const [doctors, setDoctors] = useState(null);
//     const [nameFilter, setNameFilter] = useState('');
//     const [specialityFilter, setSpecialityFilter] = useState('');

//     useEffect(() => {
//       const fetchDoctors = async () => {
//         let url = '/api/doctors/getDoctors';

//         const params = new URLSearchParams();
//         if (nameFilter) params.append('name', nameFilter);
//         if (specialityFilter) params.append('speciality', specialityFilter);
//         if (params.toString()) url += `?${params.toString()}`;

//         const response = await fetch(url);
//         const json = await response.json();

//         if (response.ok) {
//           setDoctors(json)
//         }
//       }
//       fetchDoctors();
//     }, [nameFilter, specialityFilter])

//     return (
//       <div className="doctors">
//         {/* Filter section */}
//         <div className="filters">
//           <input 
//             type="text" 
//             placeholder="Filter by name" 
//             value={nameFilter}
//             onChange={(e) => setNameFilter(e.target.value)} 
//             className="filter-input"
//           />
//           <input 
//             type="text" 
//             placeholder="Filter by speciality" 
//             value={specialityFilter}
//             onChange={(e) => setSpecialityFilter(e.target.value)}
//             className="filter-input" 
//           />
//         </div>

//         {/* Doctors list */}
//         <div className='doctors'>
//           {doctors && doctors.map((doctor) => (
//             <DoctorDetails key={doctor.username} doctor={doctor} />
//           ))}
//         </div>
//       </div>
//   )
// }

// export default Doctors;