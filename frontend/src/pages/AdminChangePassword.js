import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const AdminChangePassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const admin = { 
      newPassword: password,
      adminId: user._id // Assuming you have adminId as part of the user context
    };
    
    const response = await fetch('/api/Admin/adminchangepassword', {
      method: 'POST',
      body: JSON.stringify(admin),
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
      // Here you could redirect the admin to a confirmation page or dashboard
      // For example: navigate('/admin/dashboard');
    }
  };

  return (
    <div className="admin-change-password-page">
      <h2>Admin Dashboard</h2>
      <div className="admin-change-password-container">
        <form className="change-pass-form" onSubmit={handleSubmit}>
          <h3>Change Admin Password</h3>

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

export default AdminChangePassword;
