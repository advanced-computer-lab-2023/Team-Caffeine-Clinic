import React, { useState } from 'react';

const UpdateAffiliation = () => {
  const [newAffiliation, setNewAffiliation] = useState('');
  const [message, setMessage] = useState('');

  const handleAffiliationChange = (e) => {
    setNewAffiliation(e.target.value);
  };

  const updateAffiliation = async () => {
    try {
      const storedUsername = localStorage.getItem('username'); // Retrieve username from localStorage
      if (!storedUsername) {
        setMessage('No username found in session.');
        return;
      }

      // Send a PATCH request to update the affiliation
      const response = await fetch(
        `/updateDoctor?username=${storedUsername}&affiliation=${newAffiliation}`, // Include affiliation as a query parameter
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        setMessage('Error updating affiliation.');
        return;
      }

      setMessage('Affiliation updated successfully.');
    } catch (error) {
      console.error(error);
      setMessage('Internal Server Error.');
    }
  };

  return (
    <div>
      <h1>Update Doctor's Affiliation</h1>
      <label htmlFor="newAffiliationInput">New Affiliation:</label>
      <input
        type="text"
        id="newAffiliationInput"
        value={newAffiliation}
        onChange={handleAffiliationChange}
      />
      <button onClick={updateAffiliation}>Update Affiliation</button>
      <p>{message}</p>
    </div>
  );
};

export default UpdateAffiliation;
