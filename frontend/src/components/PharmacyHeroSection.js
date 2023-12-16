import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../PharmacyCSS/images/hero_1.jpg'
import '../PharmacyCSS/css/style.css'
import { useAuthContext } from '../hooks/useAuthContext';

const PharmacyHeroSection = () => {
  const {user} =useAuthContext();

   return (
    <div>
    <div className="site-blocks-cover" style={{ backgroundImage: `url(${backgroundImage})`}}>
      <div className="container">
      {/* <img src={backgroundImage} className="backgroundImage" /> */}
        <div className="row">
          <div className="col-lg-7 mx-auto order-lg-2 align-self-center">
            <div className="site-block-cover-content text-center">
              <h2 className="sub-title">Effective Medicine, New Medicine Everyday</h2>
              <h1>Welcome To Pharma</h1>
              <p>
                <a href="#shop" className="btn btn-primary px-5 py-3">Browse Medicines</a> <samp></samp>
               { user.type=="Pharmacist" && <a href="#Add" className="btn btn-primary px-5 py-3">Add new Medicine</a>}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
   );
}

export default PharmacyHeroSection;


