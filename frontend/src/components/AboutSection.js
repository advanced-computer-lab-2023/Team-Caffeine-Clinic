import React from 'react';
import { Link } from 'react-router-dom';

// You might need to import specific icon components or CSS here

const AboutSection = () => {
  const linkStyle = {
    textDecoration: 'none',
 };
  return (
    <section id="about" className="about">
      <div className="container-fluid">

        <div className="row">
          <div className="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch position-relative">
            {/* Consider adding a relevant video about the clinic */}
            <a href="https://www.youtube.com/watch?v=[Your_Video_Link]" className="glightbox play-btn mb-4"></a>
          </div>

          <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
            <h3>About El7a2ne</h3>
            <p>El7a2ne Clinic stands at the forefront of healthcare innovation, offering patient-centered services, a fully-equipped pharmacy, and a diverse team of medical experts. Our commitment to excellence ensures every patient receives the highest quality care.</p>

            {/* Booking Appointments */}
            <div className="icon-box">
              <div className="icon"><i className="bx bx-calendar"></i></div>
              <h4 className="title"><Link to="/doctors" style={linkStyle}>Easy Appointment Booking</Link></h4>
              <p className="description">Experience hassle-free appointment scheduling with our streamlined online system, designed for your convenience.</p>
            </div>

            {/* Pharmacy Services */}
            <div className="icon-box">
              <div className="icon"><i className="bx bx-plus-medical"></i></div>
              <h4 className="title"><Link to="/Medicines" style={linkStyle}>Comprehensive Pharmacy</Link></h4>
              <p className="description">Our on-site pharmacy offers a wide range of medications and health products, ensuring you have easy access to all your healthcare needs.</p>
            </div>

            {/* Medical Experts */}
            <div className="icon-box">
              <div className="icon"><i className="bx bx-clinic"></i></div>
              <h4 className="title"><Link to="/doctors" style={linkStyle}>Expert Medical Team</Link></h4>
              <p className="description">Our skilled team of healthcare professionals encompasses various specialties, providing comprehensive care tailored to your unique health concerns.</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;


// import React from 'react';
// // You might need to import specific icon components or CSS here

// const AboutSection = () => {
//   return (
//     <section id="about" className="about">
//       <div className="container-fluid">

//         <div className="row">
//           <div className="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch position-relative">
//             {/* Update href with your video link */}
//             <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="glightbox play-btn mb-4"></a>
//           </div>

//           <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5">
//             <h3>Enim quis est voluptatibus aliquid consequatur fugiat</h3>
//             <p>Esse voluptas cumque vel exercitationem. Reiciendis est hic accusamus. Non ipsam et sed minima temporibus laudantium. Soluta voluptate sed facere corporis dolores excepturi. Libero laboriosam sint et id nulla tenetur. Suscipit aut voluptate.</p>

//             <div className="icon-box">
//               <div className="icon"><i className="bx bx-fingerprint"></i></div>
//               <h4 className="title"><a href="">Lorem Ipsum</a></h4>
//               <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>
//             </div>

//             <div className="icon-box">
//               <div className="icon"><i className="bx bx-gift"></i></div>
//               <h4 className="title"><a href="">Nemo Enim</a></h4>
//               <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
//             </div>

//             <div className="icon-box">
//               <div className="icon"><i className="bx bx-atom"></i></div>
//               <h4 className="title"><a href="">Dine Pad</a></h4>
//               <p className="description">Explicabo est voluptatum asperiores consequatur magnam. Et veritatis odit. Sunt aut deserunt minus aut eligendi omnis</p>
//             </div>

//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }

// export default AboutSection;
