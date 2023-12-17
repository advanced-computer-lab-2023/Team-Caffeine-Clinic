import HealthPackDetails from '../components/HealthPackDetails';
import { useAuthContext } from "../hooks/useAuthContext";
import React, { useEffect, useState } from 'react';
//import axios from 'axios';

const HealthPackages = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [HealthPackage, setHealthPackage] = useState(null);
  const [transaction, setTransaction] = useState(null)
  const [FamilyHealthPackage, setFamilyHealthPackage] = useState([]);
  const [HealthPackageId, setHealthPackageId] = useState("");
  const [error, setError] = useState(null);

  const user = useAuthContext()

  const margin = {
    marginTop: '100px',
  }
  useEffect(() => {

    const fetchPatient = async () => {
      try {
        const response = await fetch('/api/patient/selectpatient', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.user.token}`
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSelectedPatient(data.patient);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatient();
    
    const fetchPatientHealthRecord = async () => {
      try {
        const response = await fetch('/api/patient/selectpatient', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.user.token}`
          },
        });
        const data = await response.json();
        if (response.ok) {
          setSelectedPatient(data.patient);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatientHealthRecord();

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
        if(data){
          setHealthPackage(data.healthPackage);
          setTransaction(data.transaction)
        }
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
<div style={margin}>

<div className='myInformation'>
    {selectedPatient && (
      <div>
        <br />
      <div className="section-title">
        <h2>Profile</h2>
      </div> 
      <div id="doctors" className="doctors">
      <div className="container">
      <div className="row">
      <div className="col-lg">
      <div className="member d-flex align-items-start">
      <div className="member-info"> 
      <h2>My Information</h2>
      <hr />
        <div><strong>Name: </strong>{selectedPatient.name}</div>
        <div><strong>Username:</strong> {selectedPatient.username}</div>
        <div><strong>Email: </strong>{selectedPatient.email}</div>
        <div><strong>Date of Birth: </strong>{selectedPatient.dob}</div>
        <div><strong>Gender: </strong>{selectedPatient.gender}</div>
        <div><strong>Mobile Number: </strong>{selectedPatient.mobile_number}</div>
        <div><strong>Wallet: </strong>{selectedPatient.wallet} EGP</div>
        {selectedPatient && (
        <div>
          <div><strong>Health Package: </strong>{selectedPatient.health_package}</div>
          <div><strong>Health Records: </strong></div>
          <ul>
            {selectedPatient.health_records.map((record, index) => (
              <li key={index}>{record}</li>
            ))}
          </ul>          
        </div>
      )}

        <br />
        <br />
        <h2>My Health Package Details</h2>
        <hr />
        <div className="health-packages">

      {error && <p className="error-message">{error}</p>}
      {HealthPackage ===  null? (
        <div>You are not subscribed to any health packages</div>
      ) : (
        <div>
            {(HealthPackage && transaction) ?
            <div>
            <div key={transaction.healthPackage}>
              <div><strong>Health Package: </strong>{transaction.healthPackage}</div>
              <div><strong>Status: </strong>{transaction.state}</div>
              {(transaction.state === 'cancelled') ?
              <div><strong>End Date: </strong>{transaction.cancel_renewal_time}</div> : <div>Renewal Date: {transaction.cancel_renewal_time}</div>}
              <div><strong>Doctor Session Discount: </strong>{HealthPackage.discounts.doctorSession * 100}%</div>
              <div><strong>Medicine Discount: </strong>{HealthPackage.discounts.pharmacyMedicine * 100}%</div>
              <div><strong>Family Health Package Discount: </strong>{HealthPackage.discounts.familySubscription * 100}%</div>
            </div>
              {(transaction.state === 'subscribed') ? 
              <button className='button-41' onClick={() => unsubscribe()}>Unsubscribe</button> : <div></div>}
            </div> 
            : <div> ....Loading </div>}
        </div>

      )}
      <br />
        <br />
        <h2>Family Members Health Packages</h2>
        <hr />
              <div>
                {FamilyHealthPackage && (FamilyHealthPackage.map((member) => (
                  <div key={member.id}>
                    <div>
                    <div><strong>Name: </strong> {member.name} </div> 
                    {(member.state !== 'unsubscribed') ?
                    <div>
                    <div><strong>Health Package:</strong> {member._doc.healthPackage}</div>
                    <div><strong>Status:</strong> {member._doc.state}</div>
                    {(member._doc.state === 'cancelled') ?
                      <div><strong>End Date:</strong> {member._doc.cancel_renewal_time}</div> : <div><strong>Renewal Date:</strong> {member._doc.cancel_renewal_time}</div>}
                      {(member._doc.state === 'subscribed') ?
                      <div><button className='button-41' onClick={() => unsubscribeFamilyMember(member.username)}>Cancel Subscription</button></div> : <div></div>} </div> : <div><strong>Status: </strong>{member.state}</div> }
                    </div>
                    <br />
                  </div>
                )))}
              </div>


            </div>


        <br />
        <br />
        <h2>Emergency Contact</h2>
        <hr />
        <div><strong>Name: </strong>{selectedPatient.emergency_contact.full_name}</div>
        <div><strong>Mobile Number: </strong>{selectedPatient.emergency_contact.mobile_number}</div>
        <div><strong>Relation: </strong>{selectedPatient.emergency_contact.relation_to_the_patient}</div>
        </div>
    </div>
    </div>
    </div>
    </div>
      </div>
      </div>
    )}
  </div>
  <br />
  <br />

  <br />

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