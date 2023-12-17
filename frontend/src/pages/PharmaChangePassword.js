import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom'; // import useNavigate for redirection
import Navbar from '../components/Navbar';

const DoctorChangePassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate(); // for redirecting after password change

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pharma = { 
      newPassword: password,
      pharmaId: user._id // Assuming you have doctorId as part of the user context
    };
    
    const response = await fetch('/api/medicine/changePharmaPass', { // make sure the endpoint matches your server configuration
      method: 'POST',
      body: JSON.stringify(pharma),
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
      navigate('/Medicines'); // Redirect to the doctor dashboard or another page
    }
  };

  return (
    <div className="home">
        <Navbar></Navbar>
      <div className="workouts">
        <form className="change-pass-form" onSubmit={handleSubmit}>
          <h3>Change Pharmacist Password</h3>

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
