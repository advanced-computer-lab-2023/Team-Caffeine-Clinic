import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const PatientChangePassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patient = { 
      newPassword: password,
      patientId: user._id // Assuming you have patientId as part of the user context
    };
    
    const response = await fetch('/api/patient/patientchangepassword', { // Make sure this matches your actual API endpoint
      method: 'POST',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}` // Make sure the token is sent for authentication
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setPassword('');
      setError(null);
      console.log('Password updated successfully:', json);
      // Optionally, redirect or update UI state as needed
    }
  };

  return (
    <div>
    <section className="breadcrumbs">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Change My Password</h2>
          <ol>
            <li><Link to="../home">Home</Link></li>
            <li>Change My Password</li>
          </ol>
        </div>
      </div>
    </section>
  
    <section className="inner-page">
      <div className="container">
        
      <section id="appointment" class="appointment section-bg">
        <div class="container">
  
          <div>
    <div className="section-title">
      <h2>Change Patient Password</h2>
      <p>Please Enter Your New Password.</p>
    </div>
    <form className="php-email-form">
      <div className="form-group mt-3">
        <textarea className="form-control" name="message" rows={5} placeholder="New Password" defaultValue={""}  value={password}
            onChange={(e) => setPassword(e.target.value)}  />
        <div className="validate" />
      </div>
      <div className="text-center"><button type="submit" onClick={(e) => handleSubmit(e)} >Change Password</button></div>

    </form>
  </div>
      </div>
    </section>
  </div>
  </section>
  </div>
  );
};

export default PatientChangePassword;

// import { useState } from 'react';
// import { useAuthContext } from '../hooks/useAuthContext';

// const PatientChangePassword = () => {
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const { user } = useAuthContext();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const patient = { 
//       newPassword: password,
//       patientId: user._id // Assuming you have patientId as part of the user context
//     };
    
//     const response = await fetch('/api/patient/patientchangepassword', { // Make sure this matches your actual API endpoint
//       method: 'POST',
//       body: JSON.stringify(patient),
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${user.token}` // Make sure the token is sent for authentication
//       }
//     });
//     const json = await response.json();

//     if (!response.ok) {
//       setError(json.error);
//     } else {
//       setPassword('');
//       setError(null);
//       console.log('Password updated successfully:', json);
//       // Optionally, redirect or update UI state as needed
//     }
//   };

//   return (
//     <div className="patient-change-password-page">
//       <h2>Patient Dashboard</h2>
//       <div className="patient-change-password-container">
//         <form className="change-pass-form" onSubmit={handleSubmit}>
//           <h3>Change Patient Password</h3>

//           <label htmlFor="newPassword">New Password:</label>
//           <input 
//             id="newPassword"
//             type="password"  
//             onChange={(e) => setPassword(e.target.value)} 
//             value={password}
//             placeholder="Enter new password"
//             required
//           />

//           <button type="submit">Update Password</button>
//           {error && <div className="error">{error}</div>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PatientChangePassword;
