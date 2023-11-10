import HealthPackDetails from '../components/HealthPackDetails';
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useEffect, useState } from 'react';
//import axios from 'axios';

const HealthPackages = () => {
  const [HealthPackage, setHealthPackage] = useState([]);
  const [HealthPackageId, setHealthPackageId] = useState("");
  const [error, setError] = useState(null);

  const user = useAuthContext()

  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const response = await fetch('/api/patient/getHealthPackage', {
          headers: {
            'Authorization': `Bearer ${user.user.token}`
          }
        });  
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Could not fetch health packages.");
        }

        setHealthPackage(data);
        console.log(data);
      } catch (err) {
        setError(err.message);
      }
    };
    if(user){
      fetchHealthPackages();
    }
  }, [user]);

  const unsubscribe = async () => {
    const response = await fetch('/api/patient/unsubscribe', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.user.token}`,
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
     window.alert(error);
    }
    if (response.ok) {
      setError(null)
      window.alert('Unsubcribed from health package');
      window.location.reload(); 
    }
}

  return (
    <div className="health-packages">
      <h1>My Health Packages</h1>

      {error && <p className="error-message">{error}</p>}

      {HealthPackage ===  null? (
        <p>You are not subscribed to any health packages</p>
      ) : (
        <ul>
          {/* {HealthPackages.map((hp) => ( */}
            <>
            <div className='Admin-details'>
            <li key={HealthPackage.name}>
              <div className='name'>{HealthPackage.name}</div>
              <div>description: {HealthPackage.description}</div>
              <div>Services Included: {HealthPackage.servicesIncluded}</div>
              <div>basePrice: {HealthPackage.basePrice}</div>
              {HealthPackage.discounts && (
          <>
            <div>Doctor Session Discount: {HealthPackage.discounts.doctorSession * 100}%</div>
            <div>Medicine Discount: {HealthPackage.discounts.pharmacyMedicine * 100}%</div>
            <div>Family Member Discount: {HealthPackage.discounts.familySubscription * 100}%</div>
          </>
        )}
            </li>
              <span className='span1' onClick={() => unsubscribe()}>Unsubscribe</span>
            </div>
              </>
          {/* ))} */}
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