import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username, password)
    
  }

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const patientResponse = await fetch('http://localhost:4000/api/loginAsPatient', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });
  
  //     if (patientResponse.status === 200) {
  //       // Redirect to the patient dashboard
  //       navigate('/home');
  //     } else {
  //       const doctorResponse = await fetch('http://localhost:4000/api/loginAsDoctor', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ username, password }),
  //       });
  
  //       if (doctorResponse.status === 200) {
  //         // Redirect to the doctor dashboard
  //         navigate('/seedoc');
  //       } else {
  //         const adminResponse = await fetch('http://localhost:4000/api/loginAsAdmin', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({ username, password }),
  //         });

  //         if (adminResponse.status === 200) {
  //           // Redirect to the doctor dashboard
  //           navigate('/AdminHome');
  //         } else{
  //         // Login failed
  //         console.error('Login failed');
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Login failed', error);
  //   }
  // };
  

  return (
    <div>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
        className='input-login'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
        className='input-login'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='login-button' type="submit" disabled={isLoading}> Log In </button>{' '}
        <Link to="/forgotPass"> Forgot your Password? </Link>
        <Link to="/signup"><button className='login-button'>Sign Up</button></Link>{' '}
        <Link to="/doctorApplication"><button className='login-button'>Sign Up As a Doctor</button></Link>

        {error && <div className='error'>{ error }</div>}
      </form>
    </div>
  );
}

export default LoginForm;
