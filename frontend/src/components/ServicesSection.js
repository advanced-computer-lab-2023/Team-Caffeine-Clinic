import React from 'react';
import { Link } from 'react-router-dom';
// Import any necessary CSS or icons

const ServicesSection = () => {
  const linkStyle = {
    textDecoration: 'none',
 };

   return (
     <section id="services" className="services">
       <div className="container">

         <div className="section-title">
           <h2>Services</h2>
           <p>We offer a comprehensive range of medical services and treatments.</p>
         </div>

         <div className="row">
           {/* Service Box 1 */}
           <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
             <div className="icon-box">
               <div className="icon"><i className="fas fa-heartbeat"></i></div>
               <h4><a href="" style={linkStyle}>Health Packages</a></h4>
               <p>What pains and what troubles will be endured by those who have softened and corrupted their pleasures</p>
             </div>
           </div>

           {/* Service Box 2 */}
           <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
             <div className="icon-box">
               <div className="icon"><i className="fas fa-pills"></i></div>
               <h4><Link to="/Perscriptions" style={linkStyle}>Prescriptions</Link></h4>
               <p>Check old and recent prescriptions from your clinic visits. Collect now to buy.</p>
             </div>
           </div>

           {/* Service Box 3 */}
           <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
             <div className="icon-box">
               <div className="icon"><i className="fas fa-hospital-user"></i></div>
               <h4><Link to="/medicines" style={linkStyle}>Pharmacy</Link></h4>
               <p>Provides a variety of medications and health products</p>
             </div>
           </div>

         </div>

       </div>
     </section>
   );
}

export default ServicesSection;