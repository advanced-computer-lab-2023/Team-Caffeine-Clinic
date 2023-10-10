import React, { useState } from 'react';

const UpdateEmail = () => {
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const updateEmail = async () => {
    try {
      const storedUsername = localStorage.getItem('username'); // Retrieve username from localStorage
      if (!storedUsername) {
        setMessage('No username found in session.');
        return;
      }

      // Send a PATCH request to update the email
      const response = await fetch(
        `/updateEmail?username=${storedUsername}&email=${newEmail}`, // Include email as a query parameter
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        setMessage('Error updating email.');
        return;
      }

      setMessage('Email updated successfully.');
    } catch (error) {
      console.error(error);
      setMessage('Internal Server Error.');
    }
  };

  return (
    <div>
      <h1>Update Doctor's Email</h1>
      <label htmlFor="newEmailInput">New Email:</label>
      <input
        type="text"
        id="newEmailInput"
        value={newEmail}
        onChange={handleEmailChange}
      />
      <button onClick={updateEmail}>Update Email</button>
      <p>{message}</p>
    </div>
  );
};

export default UpdateEmail;
