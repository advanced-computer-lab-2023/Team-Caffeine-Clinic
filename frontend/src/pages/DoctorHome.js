import React, { useState, useEffect } from 'react';

import { useAuthContext } from '../hooks/useAuthContext';
import DoctorNavbar from '../components/DoctorNavbar.js';

const DoctorHome = () => {

  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/doctorInfo/getDoctorByusername`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      });
      if (!response.ok) {
        throw new Error('Doctor not found');
      }

      const data = await response.json();
      setDoctor(data[0]);
      setError(null);
    } catch (error) {
      setDoctor(null);
      setError('Doctor not found');
    }
  };

  useEffect(() => {
    handleSearch();
  }, []); // Empty dependency array to trigger only on initial render

  return (
    <>
      <DoctorNavbar />
 {error && <p style={{ color: 'red' }}>{error}</p>}
      {doctor && (
          <section id="hero" className="d-flex align-items-center">
  <div className="container">
    <h1>Welcome {doctor.username}</h1>
    <h2>Glad to have you back!</h2>
    <a href="#about" className="btn-get-started scrollto">Get Started</a>
  </div>
</section>
 )};

<section id="services" className="services">
  <div className="container">
    <div className="section-title">
      <h2>Services</h2>
      <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
    </div>
    <div className="row">
      <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
        <div className="icon-box">
          <div className="icon"><i className="fas fa-heartbeat" /></div>
          <h4><a href>Lorem Ipsum</a></h4>
          <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
        <div className="icon-box">
          <div className="icon"><i className="fas fa-pills" /></div>
          <h4><a href>Sed ut perspiciatis</a></h4>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
        <div className="icon-box">
          <div className="icon"><i className="fas fa-hospital-user" /></div>
          <h4><a href>Magni Dolores</a></h4>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
        <div className="icon-box">
          <div className="icon"><i className="fas fa-dna" /></div>
          <h4><a href>Nemo Enim</a></h4>
          <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
        <div className="icon-box">
          <div className="icon"><i className="fas fa-wheelchair" /></div>
          <h4><a href>Dele cardo</a></h4>
          <p>Quis consequatur saepe eligendi voluptatem consequatur dolor consequuntur</p>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
        <div className="icon-box">
          <div className="icon"><i className="fas fa-notes-medical" /></div>
          <h4><a href>Divera don</a></h4>
          <p>Modi nostrum vel laborum. Porro fugit error sit minus sapiente sit aspernatur</p>
        </div>
      </div>
    </div>
  </div>
</section>
      </>
  );
};

export default DoctorHome;
