import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import logo from '../img/logo.png';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  return (
    <div className="login-page">
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <div className="login-form-container">
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
          <button className='login-button' type="submit" disabled={isLoading}>
            Log In
          </button>{' '}
          <Link to="/forgotPass" className="forgot-password-link">
            Forgot your Password? 
          </Link>
         <Link to="/signup">
            <button className='login-button'>Sign Up</button>
          </Link>{' '}
          <Link to="/doctorApplication">
            <button className='login-button'>Sign Up As a Doctor</button>
          </Link>
          {error && <div className='error-message'>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;