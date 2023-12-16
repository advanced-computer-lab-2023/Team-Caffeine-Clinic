// // MyPatients.js

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// import { useAuthContext } from '../hooks/useAuthContext';


// const MyPatients = () => {
//   const [patients, setPatients] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   const {user} = useAuthContext()

  
//   const fetchPatientDetails = async (patientUsername) => {
    
//     try {
//       const response = await fetch(`/api/doctorInfo/selectpatient?name=${patientUsername}`, {
//         headers: {
//           'Authorization': `Bearer ${user.token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch patient details');
//       }

//       const data = await response.json();
//       setSelectedPatient(data.patient);
//     } catch (error) {
//       console.error(error);
//       setError('Failed to fetch patient details');
//     }
//   };

//   const clearSelectedPatient = () => {
//     setSelectedPatient(null);
//   };

//   useEffect(() => {
//     // Fetch the list of patients when the component mounts
//     const fetchDoctorPatients = async () => {
//       try {
//   //       const storedUsername = localStorage.getItem('username');

//   // if (!storedUsername) {
//   //   setError('No username found in session.');
    
//   //   return;
//   // }
//         const response = await fetch(`/api/doctorInfo/myPatients/`, {
//           headers: {
//             'Authorization': `Bearer ${user.token}`
//           }
//         }); // You should replace with your actual API endpoint

//         if (!response.ok) {
//           throw new Error('Failed to fetch patients');
//         }

//         const data = await response.json();
//         setPatients(data.patientUsernames);
//       } catch (error) {
//         console.error(error);
//         setError('Failed to fetch patients');
//       }
//     };
//     if(user){
//       fetchDoctorPatients();
//     }
//   }, [user]);

//   const displayPatientDetails = () => {
//     if (selectedPatient) {
//       return (
//         <div>
//           <h2>Selected Patient</h2>
//           <p>Username: {selectedPatient.username}</p>
//           <p>Name: {selectedPatient.name}</p>
//           <p>Email: {selectedPatient.email}</p>
//           <p>Date of birth: {selectedPatient.dob}</p>
//           <p>Gender: {selectedPatient.gender}</p>
//           <p>Mobile Number: {selectedPatient.mobile_number}</p>
  
//           {selectedPatient.emergency_contact && (
//           <div>
//             <h2>Emergency Contact</h2>
//             <p>Name: {selectedPatient.emergency_contact.full_name}</p>
//             <p>Mobile Number: {selectedPatient.emergency_contact.mobile_number}</p>
//             <p>Relation: {selectedPatient.emergency_contact.relation_to_the_patient}</p>
//             <Link to={`/AddPrescription/${selectedPatient.username}`} >Add prescription</Link>
//           </div>
//         )}
  
//           <br />
//           <button onClick={clearSelectedPatient}>Close</button>
//         </div>
//       );
//     } else {
//       return null;
//     }
//   };
  

//   return (
//     // <div>
//     //   <h1>My Patients</h1>
//     //   {error && <p style={{ color: 'red' }}>{error}</p>}
//       //  <ul>
//       //   {patients.length > 0 ? (
//       //     patients.map((patientUsername, index) => (
//       //       <li key={index}>
//       //         {patientUsername}
//       //         <button onClick={() => fetchPatientDetails(patientUsername)}>Select Patient</button>
//       //       </li>
//       //     ))
//       //   ) : (
//       //     <p>No patients found for this doctor.</p>
//       //   )}
//       // </ul>
//       // {displayPatientDetails()}

//     <div>
//   <section className="breadcrumbs">
//     <div className="container">
//       <div className="d-flex justify-content-between align-items-center">
//         <h2>View My patients</h2>
//         <ol>
//           <li><Link to="../DoctorHome">Home</Link></li>
//           <li>View My Patients</li>
//         </ol>
//       </div>
//     </div>
//   </section>{/* End Breadcrumbs Section */}
//   <section className="inner-page">
//     <div className="container">
//    <section id="doctors" className="doctors">
//   <div className="container">
//     <div className="section-title">
//       <h2>Patients</h2>
//       </div>
//     <div className="row">
//       <div className="col-lg-6">
//         <div className="member d-flex align-items-start">
//           <div className="pic"><img src="assets/img/doctors/doctors-1.jpg" className="img-fluid" alt /></div>
//           <div className="member-info">
//             <h4></h4>
//             <span>Chief Medical Officer</span>
//             <p>Explicabo voluptatem mollitia et repellat qui dolorum quasi</p>
//             <button onClick={() => fetchPatientDetails(patientUsername)}>View Details</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>

//     </div>
//   </section>
// </div>

//   );
// };

// export default MyPatients;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const MyPatients = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const { user } = useAuthContext();

  const fetchPatientDetails = async (patientUsername) => {
    try {
      const response = await fetch(`/api/doctorInfo/selectpatient?name=${patientUsername}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch patient details');
      }

      const data = await response.json();
      setSelectedPatient(data.patient);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch patient details');
    }
  };

  const clearSelectedPatient = () => {
    setSelectedPatient(null);
  };

  useEffect(() => {
    const fetchDoctorPatients = async () => {
      try {
        const response = await fetch(`/api/doctorInfo/myPatients/`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }

        const data = await response.json();
        setPatients(data.patientUsernames);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch patients');
      }
    };

    if (user) {
      fetchDoctorPatients();
    }
  }, [user]);

  const displayPatientDetails = () => {
    if (selectedPatient) {
      return (
        <div>
          <h2>Selected Patient</h2>
          <p>Username: {selectedPatient.username}</p>
          <p>Name: {selectedPatient.name}</p>
          <p>Email: {selectedPatient.email}</p>
          <p>Date of birth: {selectedPatient.dob}</p>
          <p>Gender: {selectedPatient.gender}</p>
          <p>Mobile Number: {selectedPatient.mobile_number}</p>

          {selectedPatient.emergency_contact && (
            <div>
              <h2>Emergency Contact</h2>
              <p>Name: {selectedPatient.emergency_contact.full_name}</p>
              <p>Mobile Number: {selectedPatient.emergency_contact.mobile_number}</p>
              <p>Relation: {selectedPatient.emergency_contact.relation_to_the_patient}</p>
              <Link to={`/AddPrescription/${selectedPatient.username}`}>Add prescription</Link>
            </div>
          )}

          <br />
          <button onClick={clearSelectedPatient}>Close</button>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <section className="breadcrumbs">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>View My patients</h2>
            <ol>
              <li><Link to="../DoctorHome">Home</Link></li>
              <li>View My Patients</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="inner-page">
        <div className="container">
          <section id="doctors" className="doctors">
            <div className="container">
              <div className="section-title">
                <h2>Patients</h2>
              </div>
              <div className="row">
                {patients.map((patientUsername) => (
                  <div className="col-lg-6" key={patientUsername}>
                    <div className="member d-flex align-items-start">
                      {/* You can replace the placeholder image with the actual patient image */}
                      <div className="pic"><img src="assets/img/guest.png" className="img-fluid" alt={patientUsername} /></div>
                      <div className="member-info">
                        <span>{patientUsername}</span>
                        <p></p>
                        <button lassName = "appointment-btn scrollto" onClick={() => fetchPatientDetails(patientUsername)}>View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {displayPatientDetails()}
        </div>
      </section>
    </div>
  );
};

export default MyPatients;
