import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import logo from '../img/logo.png';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedSignUpOption, setSelectedSignUpOption] = useState('');
  const [signUpClicked, setSignUpClicked] = useState(false);

  const { login, error, isLoading } = useLogin();

  const linkStyle = {
    textDecoration: 'none',
  };

  const headerStyle = {
    background: 'transparent',
  };

  useEffect(() => {
    if (selectedSignUpOption) {
      // Redirect to the selected sign-up page
      window.location.href = getSignUpLink(selectedSignUpOption);
    }
  }, [selectedSignUpOption]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleSignUpClick = () => {
    setSignUpClicked(true);
  };

  const handleBackClick = () => {
    setSignUpClicked(false);
  };

  const handleSignUpOptionChange = (event) => {
    setSelectedSignUpOption(event.target.value);
  };

  const getSignUpLink = (option) => {
    switch (option) {
      case 'patient':
        return '/signup';
      case 'doctor':
        return '/doctorApplication';
      case 'pharmacist':
        return '/applyPharmacist';
      default:
        return '/';
    }
  };

  const renderLoginForm = () => {
    return (
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
        </button>
        <button className='login-button' onClick={handleSignUpClick}>
          Sign Up
        </button>{' '}
        <Link to="/forgotPass" className="forgot-password-link">
          Forgot your Password? 
        </Link>
        {error && <div className='error-message'>{error}</div>}
      </form>
    );
  };

  const renderSignUpOptions = () => {
    return (
      <div>
        <button className='login-button' onClick={handleBackClick}>
          Back
        </button>
        <select className='login-button' onChange={handleSignUpOptionChange} value={selectedSignUpOption}>
          <option value="" disabled>Select Sign Up Option</option>
          <option value="patient">Sign Up as a Patient</option>
          <option value="doctor">Sign Up As a Doctor</option>
          <option value="pharmacist">Sign Up As a Pharmacist</option>
        </select>
      </div>
    );
  };

  return (
    <body>
      <header id="header" className="fixed-top" style={headerStyle}>
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto"><a href="" style={linkStyle}>El7a2ne</a></h1>
        </div>
      </header>
      <div className="login-page">
        <div className="login-form-container">
          {signUpClicked ? renderSignUpOptions() : renderLoginForm()}
        </div>
      </div>
    </body>
  );
}

export default LoginForm;
