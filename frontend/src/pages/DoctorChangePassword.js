import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom'; // import useNavigate for redirection

const DoctorChangePassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate(); // for redirecting after password change

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctor = { 
      newPassword: password,
      doctorId: user._id // Assuming you have doctorId as part of the user context
    };
    
    const response = await fetch('/api/doctorInfo/doctorchangepassword', { // make sure the endpoint matches your server configuration
      method: 'POST',
      body: JSON.stringify(doctor),
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
      navigate('/doctor/dashboard'); // Redirect to the doctor dashboard or another page
    }
  };

  return (
    <div className="doctor-change-password-page">
      <h2>Doctor Dashboard</h2>
      <div className="doctor-change-password-container">
        <form className="change-pass-form" onSubmit={handleSubmit}>
          <h3>Change Doctor Password</h3>

          <label htmlFor="newPassword">New Password:</label>
          <input 
            id="newPassword"
            type="password"  
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
            placeholder="Enter new password"
            required
          />

          <button type="submit">Update Password</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default DoctorChangePassword;
