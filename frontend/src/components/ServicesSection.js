import React from 'react';
// Import any necessary CSS or icons

const ServicesSection = () => {
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
               <h4><a href="">Lore Itself</a></h4>
               <p>What pains and what troubles will be endured by those who have softened and corrupted their pleasures</p>
             </div>
           </div>

           {/* Service Box 2 */}
           <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
             <div className="icon-box">
               <div className="icon"><i className="fas fa-pills"></i></div>
               <h4><a href="">But that you may see</a></h4>
               <p>Does not the anger of pain in rebuke in pleasure want to be a hair of pain</p>
             </div>
           </div>

           {/* Service Box 3 */}
           <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
             <div className="icon-box">
               <div className="icon"><i className="fas fa-hospital-user"></i></div>
               <h4><a href="">Great Sorrows</a></h4>
               <p>Except they are blinded by lust, they do not come forth, they are in fault who do the duties</p>
             </div>
           </div>

           <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
             <div className="icon-box">
               <div className="icon"><i className="fas fa-dna"></i></div>
               <h4><a href="">No One</a></h4>
               <p>But in truth we both accuse them and lead with just hatred those who deserve flattery</p>
             </div>
           </div>

           <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
             <div className="icon-box">
               <div className="icon"><i className="fas fa-wheelchair"></i></div>
               <h4><a href="">Delete card</a></h4>
               <p>He who often chooses the pleasure of choosing will suffer the consequences</p>
             </div>
           </div>

           <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4">
             <div className="icon-box">
               <div className="icon"><i className="fas fa-notes-medical"></i></div>
               <h4><a href="">Divera don</a></h4>
               <p>Like our snacks. Moreover, error flees, let it be less wise, let it be asperated</p>
             </div>
           </div>

         </div>

       </div>
     </section>
   );
}

export default ServicesSection;