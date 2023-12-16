import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom'; // import useNavigate for redirection
import { Link } from 'react-router-dom';

const DoctorChangePassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
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
      setMessage('Please provide a valid password!')
    } else {
      setPassword('');
      setError(null);
      console.log('Password updated successfully:', json);
      setMessage('password updated successfully');
      navigate('/seedoc'); // Redirect to the doctor dashboard or another page
    }
  };

  return (
    // <div className="doctor-change-password-page">
    //   <h2>Doctor Dashboard</h2>
    //   <div className="doctor-change-password-container">
    //     <form className="change-pass-form" onSubmit={handleSubmit}>
    //       <h3>Change Doctor Password</h3>

    //       <label htmlFor="newPassword">New Password:</label>
    //       <input 
    //         id="newPassword"
    //         type="password"  
    //         onChange={(e) => setPassword(e.target.value)} 
    //         value={password}
    //         placeholder="Enter new password"
    //         required
    //       />

    //       <button type="submit">Update Password</button>
    //       {error && <div className="error">{error}</div>}
    //     </form>
    //   </div>
    // </div>
    <div>
    <section className="breadcrumbs">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Change My Password</h2>
          <ol>
            <li><Link to="../DoctorHome">Home</Link></li>
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
      <h2>Change Doctor Password</h2>
      <p>Please Enter Your New Password.</p>
    </div>
    <form className="php-email-form">
      <div className="form-group mt-3">
        <textarea className="form-control" name="message" rows={5} placeholder="New Password" defaultValue={""}  value={password}
            onChange={(e) => setPassword(e.target.value)}  />
        <div className="validate" />
      </div>
      <div className="text-center"><button type="submit" onClick={(e) => handleSubmit(e)} >Change Password</button></div>
      <div className="section-title"> <p>{message}</p>  </div> 
    </form>
  </div>
      </div>
    </section>
  </div>
  </section>
  </div>
  );
};

export default DoctorChangePassword;
