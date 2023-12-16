import React, { useState } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from "react-router-dom"
const UpdateRate = () => {
  const [newRate, setNewRate] = useState('');
  const [message, setMessage] = useState('');

  const {user} = useAuthContext()

  const handleRateChange = (e) => {
    setNewRate(e.target.value);
  };

  const updateRate = async (e) => {
    e.preventDefault();
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
    // <div>
    //   <h1>Update Doctor's Rate</h1>
    //   <label htmlFor="newRateInput">New Rate:</label>
    //   <input
    //     type="number"
    //     id="newRateInput"
    //     value={newRate}
    //     onChange={handleRateChange}
    //   />
    //   <button onClick={updateRate}>Update Rate</button>
    //   <p>{message}</p>
    // </div>
   <div>
  <section className="breadcrumbs">
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Edit My Rate</h2>
        <ol>
          <li><Link to="../DoctorHome">Home</Link></li>
          <li>Edit My rate</li>
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
    <h2>Update Doctor Rate</h2>
    <p>Please Enter Your Desired Rate.</p>
  </div>
  <form className="php-email-form">
    <div className="form-group mt-3">
      <textarea className="form-control" name="message" rows={5} placeholder="New Rate" defaultValue={""}  value={newRate}
         onChange={handleRateChange} />
      <div className="validate" />
    </div>
    <div className="text-center"><button type="submit" onClick={(e) => updateRate(e)} >Update Rate</button></div>
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

export default UpdateRate;
