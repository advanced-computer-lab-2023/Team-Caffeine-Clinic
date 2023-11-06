import React, { useState } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';

const UpdateRate = () => {
  const [newRate, setNewRate] = useState('');
  const [message, setMessage] = useState('');

  const {user} = useAuthContext()

  const handleRateChange = (e) => {
    setNewRate(e.target.value);
  };

  const updateRate = async () => {
    try {
      // const storedUsername = localStorage.getItem('username'); // Retrieve username from localStorage
      // if (!storedUsername) {
      //   setMessage('No username found in session.');
      //   return;
      // }

      // Send a PATCH request to update the rate
      const response = await fetch(
        `/api/doctorInfo/updateRate?rate=${newRate}`, // Include rate as a query parameter
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
        }
      );

      if (!response.ok) {
        setMessage('Error updating rate.');
        return;
      }

      setMessage('Rate updated successfully.');
    } catch (error) {
      console.error(error);
      setMessage('Internal Server Error.');
    }
  };

  return (
    <div>
      <h1>Update Doctor's Rate</h1>
      <label htmlFor="newRateInput">New Rate:</label>
      <input
        type="number"
        id="newRateInput"
        value={newRate}
        onChange={handleRateChange}
      />
      <button onClick={updateRate}>Update Rate</button>
      <p>{message}</p>
    </div>
  );
};

export default UpdateRate;
