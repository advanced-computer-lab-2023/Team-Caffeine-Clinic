import React from 'react';
import HomeImage from '../assets/img/hero-bg.jpg'; // Adjust the path accordingly

const HomeSection = () => {
  const linkStyle = {
    textDecoration: 'none',
 };
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <h1>Welcome to El7a2ne</h1>
          <h2>Dedicated to providing excellent healthcare services</h2>
          <a href="#about" style={linkStyle} className="btn-get-started scrollto">Get Started</a>
        </div>
      </section>

      <main id="main">
        {/* Why Us Section */}
        <section id="why-us" className="why-us">
          <div className="container">

            <div className="row">
              <div className="col-lg-4 d-flex align-items-stretch">
                <div className="content">
                  <h3>Why Choose El7a2ne Clinic?</h3>
                  <p>
                    At El7a2ne Clinic, we prioritize your health and well-being. Our state-of-the-art facilities and expert medical team ensure you receive the best possible care. We are committed to compassionate service and personalized treatment plans.
                  </p>
                  <div className="text-center">
                    <a href="#about" style={linkStyle} className="more-btn">Learn More <i className="bx bx-chevron-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 d-flex align-items-stretch">
                <div className="icon-boxes d-flex flex-column justify-content-center">
                  <div className="row">
                    {/* Icon Box 1 */}
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-heart"></i>
                        <h4>Comprehensive Care</h4>
                        <p>From general check-ups to specialized treatments, we cover all aspects of healthcare to ensure your well-being.</p>
                      </div>
                    </div>
                    {/* Icon Box 2 */}
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box mt-4 mt-xl-0">
                      <i className="bx bx-chip"></i>
                        <h4>Advanced Medical Technology</h4>
                        <p>Our clinic is equipped with the latest medical technology to provide accurate diagnoses and effective treatments.</p>
                      </div>
                    </div>
                    {/* Icon Box 3 */}
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-medal"></i>
                        <h4>Expert Medical Team</h4>
                        <p>Our team of healthcare professionals is dedicated to delivering high-quality care with compassion and understanding.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}

export default HomeSection;
