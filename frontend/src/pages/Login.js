import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const patientResponse = await fetch('/api/loginAsPatient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
  
      if (patientResponse.status === 200) {
        // Redirect to the patient dashboard
        navigate('/home');
      } else {
        const doctorResponse = await fetch('/api/loginAsDoctor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });
  
        if (doctorResponse.status === 200) {
          // Redirect to the doctor dashboard
          navigate('/seedoc');
        } else {
          // Login failed
          console.error('Login failed');
        }
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
