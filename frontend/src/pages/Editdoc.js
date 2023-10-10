// EditMyDoc.js

import React, { useEffect, useState } from 'react';

const EditMyDoc = () => {
  const [usernameFromSession, setUsernameFromSession] = useState('');

  // Use useEffect to retrieve the username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsernameFromSession(storedUsername);
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="DoctorHome">
      <h2>DoctorHome</h2>
      <p>Username from Session: {usernameFromSession}</p>
    </div>
  );
};

export default EditMyDoc;
