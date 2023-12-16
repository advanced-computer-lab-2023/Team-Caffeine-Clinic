import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';


const UpdateEmail = () => {
  const [newEmail, setNewEmail] = useState('');
  const [message, setMessage] = useState('');

  const {user} = useAuthContext()


  const handleEmailChange = (e) => {
    setNewEmail(e.target.value);
  };

  const updateEmail = async (e) => {
    e.preventDefault();
    try {
      // const storedUsername = localStorage.getItem('username'); // Retrieve username from localStorage
      // if (!storedUsername) {
      //   setMessage('No username found in session.');
      //   return;
      // }

      // Send a PATCH request to update the email
      const response = await fetch(
        `/api/doctorInfo/updateEmail?email=${newEmail}`, // Include email as a query parameter
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
        }
      );

      if (!response.ok) {
        setMessage('Please Enter a valid email address');
        return;
      }
      
      setNewEmail('');
      setMessage('Email updated successfully.');
    } catch (error) {
      console.error(error);
      setMessage('Internal Server Error.');
    }
  };

  return (
    // <div>
    //   <h1>Update Doctor's Email</h1>
    //   <label htmlFor="newEmailInput">New Email:</label>
    //   <input
    //     type="text"
    //     id="newEmailInput"
    //     value={newEmail}
    //     onChange={handleEmailChange}
    //   />
    //   <button onClick={updateEmail}>Update Email</button>
    //   <p>{message}</p>
    // </div>
    <div>
    <section className="breadcrumbs">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Edit My Email</h2>
          <ol>
            <li><Link to="../DoctorHome">Home</Link></li>
            <li>Edit My Email</li>
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
      <h2>Update Doctor Email</h2>
      <p>Please Enter Your New Email.</p>
    </div>
    <form className="php-email-form">
      <div className="form-group mt-3">
        <textarea className="form-control" name="message" rows={5} placeholder="New Email" defaultValue={""}  value={newEmail}
           onChange={handleEmailChange} />
        <div className="validate" />
      </div>
      <div className="text-center"><button type="submit" onClick={(e) => updateEmail(e)} >Update Email</button></div>
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

export default UpdateEmail;
