import React, { useState } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

const UpdateAffiliation = () => {
  const [newAffiliation, setNewAffiliation] = useState('');
  const [message, setMessage] = useState('');

  const {user} = useAuthContext()

  const handleAffiliationChange = (e) => {
    setNewAffiliation(e.target.value);
  };

  const updateAffiliation = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/doctorInfo/updateDoctor?affiliation=${newAffiliation}`, 
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
        }
      );

      if (!response.ok) {
        setMessage('Error updating affiliation.');
        return;
      }

      setMessage('Affiliation updated successfully.');
      setNewAffiliation('');

    } catch (error) {
      console.error(error);
      setMessage('Internal Server Error.');
    }
  };

  return (
    // <div>
    //   <h1>Update Doctor's Affiliation</h1>
    //   <label htmlFor="newAffiliationInput">New Affiliation:</label>
    //   <input
    //     type="text"
    //     id="newAffiliationInput"
    //     value={newAffiliation}
    //     onChange={handleAffiliationChange}
    //   />
    //   <button onClick={updateAffiliation}>Update Affiliation</button>
    //   <p>{message}</p>
    // </div>

    <div>
    <section className="breadcrumbs">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Edit My Hospital</h2>
          <ol>
            <li><Link to="../DoctorHome">Home</Link></li>
            <li>Edit My Hospital</li>
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
      <h2>Update Doctor Hospital</h2>
      <p>Please Enter Your New Hospital.</p>
    </div>
    <form className="php-email-form">
      <div className="form-group mt-3">
        <textarea className="form-control" name="message" rows={5} placeholder="New Hospital" defaultValue={""}  value={newAffiliation}
           onChange={handleAffiliationChange} />
        <div className="validate" />
      </div>
      <div className="text-center"><button type="submit" onClick={(e) => updateAffiliation(e)} >Update Hospital</button></div>
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

export default UpdateAffiliation;
