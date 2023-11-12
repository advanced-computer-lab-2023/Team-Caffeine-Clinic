import HealthPackDetails from '../components/HealthPackDetails';
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useEffect, useState } from 'react';
//import axios from 'axios';

const HealthPackages = () => {
  const [HealthPackage, setHealthPackage] = useState(null);
  const [transaction, setTransaction] = useState(null)
  const [FamilyHealthPackage, setFamilyHealthPackage] = useState([]);
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

        setHealthPackage(data.healthPackage);
        setTransaction(data.transaction)
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

const unsubscribeFamilyMember = async (familyMember) => {
  const response = await fetch(`/api/patient/unsubscribe?familyMemberUsername=${familyMember}`, {
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

useEffect(() => {
  const getFamilyMembersHealthPackages = async () => {
    try {
      const response = await fetch('/api/patient/getFamilyMembersHealthPackages', {
        headers: {
          'Authorization': `Bearer ${user.user.token}`
        }
      });  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Could not fetch health packages.");
      }
      console.log(data);
      setFamilyHealthPackage(data.familyMembersHealthPackages);
    } catch (err) {
      setError(err.message);
    }
  };

  if(user){
    getFamilyMembersHealthPackages()
  }
}, [user])






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
            {(HealthPackage && transaction) ?
            <div className='Admin-details'>
            <li key={transaction.healthPackage}>
              <div className='name'>{transaction.healthPackage}</div>
              <div>Status: {transaction.state}</div>
              {(transaction.state === 'cancelled') ?
              <div>End Date: {transaction.cancel_renewal_time}</div> : <div>Renewal Date: {transaction.cancel_renewal_time}</div>}
              <div>Doctor Session Discount: {HealthPackage.discounts.doctorSession * 100}%</div>
              <div>Medicine Discount: {HealthPackage.discounts.pharmacyMedicine * 100}%</div>
              <div>Family Health Package Discount: {HealthPackage.discounts.familySubscription * 100}%</div>
            </li>
              {(transaction.state === 'subscribed') ? 
              <span className='span1' onClick={() => unsubscribe()}>Unsubscribe</span> : <div></div>}
            </div> 
            : <div> ....Loading </div>}
              </>
          {/* ))} */}
        </ul>



      )}




<h2>Family Members Health Package</h2>
      <ul>
        {FamilyHealthPackage && (FamilyHealthPackage.map((member) => (
          <li key={member.id}>
            <div className='Admin-details'>
            <div className='name'> {member.name} </div> 
            <strong>Health Package:</strong> {member._doc.healthPackage}
            <div><strong>Status:</strong> {member._doc.state}</div>
            {(member._doc.state === 'cancelled') ?
              <div><strong>End Date:</strong> {member._doc.cancel_renewal_time}</div> : <div><strong>Renewal Date:</strong> {member._doc.cancel_renewal_time}</div>}
              {(member._doc.state === 'subscribed') ?
              <span onClick={() => unsubscribeFamilyMember(member.username)}>Cancel Subscription</span> : <div></div>}
            </div>
          </li>
        )))}
      </ul>


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