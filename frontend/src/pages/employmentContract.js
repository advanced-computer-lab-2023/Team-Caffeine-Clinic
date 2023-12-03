import React, { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom"
import { useLogout } from '../hooks/useLogout'

import "../index.css"
import { Button } from 'react-bootstrap';


const App1 = () => {
  const [employmentContract, setEmploymentContract] = useState(null);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const user = useAuthContext();
  const navigate = useNavigate();
  
  const { logout } = useLogout();


  const getEmploymentContract = async () => {
    try {
      const response = await fetch(`/api/emplymentContract/getEmploymentContract?doctor=${username}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.user.token}`
        },
    });
      const data = await response.json();
      setEmploymentContract(data);
    } catch (error) {
      console.error('Error fetching employment contract:', error);
      setError('Error fetching employment contract data. Please try again later.');
    }
  };

  const acceptContract = async () => {
    try {
      const response = await fetch(`/api/emplymentContract/acceptContract?username=${username}`, {
        method: 'PATCH', 
        headers: {
            'Authorization': `Bearer ${user.user.token}`
        }
      });
      // handle success if needed
      if(response){
        window.alert('Welcome Doctor')
        user.type = "Doctor"
        navigate('/seedoc')
      }

    } catch (error) {
      console.error('Error accepting contract:', error);
      setError('Error accepting the contract. Please try again later.');
    }
  };

  const rejectContract = async () => {
    try {
      const response = await fetch(`/api/emplymentContract/rejectContract?username=${username}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${user.user.token}`
        }
      });
      // handle success if needed
      if(response){
        logout()
      }
    } catch (error) {
      console.error('Error rejecting contract:', error);
      setError('Error rejecting the contract. Please try again later.');
    }
  };
  const handleClick = () => {
    logout()
  }


  useEffect(() => {
    if (username) {
      getEmploymentContract();
    }
  }, [username]);

  return (
    <div>
      <div>
        <label htmlFor="usernameInput">Enter your username: </label>
        <input
          type="text"
          id="usernameInput"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <button onClick={acceptContract}>Accept</button>
        <button onClick={rejectContract}>Reject</button>
        
      </div>
      {employmentContract ? (
        <div>
          <h2>Employment Contract Details</h2>
          <p>Doctor: {employmentContract.doctor}</p>
          <p>Contract Details: {employmentContract.contractDetails}</p>
          <p>Markup: {employmentContract.markup}</p>
          <p>Clinic Profit: {employmentContract.clinicProfit}</p>
        </div>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>Please enter your username to fetch employment contract data.</p>
      )}


<Link  to="/" onClick={handleClick}><Button>Log Out</Button></Link>

    </div>
  );
};

export default App1;