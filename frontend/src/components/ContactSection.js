import React, { useState, useEffect } from 'react';

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting) {
      setShowButton(false);

      // Simulate form submission delay and reset
      setTimeout(() => {
        setIsSubmitting(false);
        setShowButton(true);
      }, 3000);
    }
  }, [isSubmitting]);
  return (
    <section id="contact" className="contact">
      <div className="container">

      <div className="section-title">
        <h2>Contact Us</h2>
        <p>At El7a2ne Clinic, we're always here to help. Whether you need to schedule an appointment, have questions about our services, or need medical advice, feel free to reach out.</p>
      </div>

      </div>

      <div>
        <iframe 
          style={{ border: 0, width: '100%', height: '350px' }} 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13822.33472011395!2d31.434189450000023!3d29.991392400000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583cb2bfafbe73%3A0x6e7220116094726d!2sGerman%20University%20in%20Cairo%20(GUC)!5e0!3m2!1sen!2seg!4v1702037969698!5m2!1sen!2seg" 
          frameBorder="0" 
          allowFullScreen>
        </iframe>
      </div>

      <div className="container">
        <div className="row mt-5">

          <div className="col-lg-4">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt"></i>
                <h4>Location:</h4>
                <p>German Universty in Cairo</p>
              </div>

              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>El7a2ne@gmail.com</p>
              </div>

              <div className="phone">
                <i className="bi bi-phone"></i>
                <h4>Call:</h4>
                <p>+2 01021705704</p>
              </div>

            </div>

          </div>

          <div className="col-lg-8 mt-5 mt-lg-0">

          <form onSubmit={handleSubmit} className="php-email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  {/* <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required> */}
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  {/* <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required> */}
                </div>
              </div>
              <div className="form-group mt-3">
                {/* <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required> */}
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center">
              {showButton && <button type="submit" className={isSubmitting ? 'fade-button' : ''}>Send Message</button>}
              </div>
            </form>
            {isSubmitting && (
              <div className="success-message">
                <i className="bi bi-check-circle" style={{ color: 'green' }}></i>
                <span>Your message has been sent. Thank you!</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;