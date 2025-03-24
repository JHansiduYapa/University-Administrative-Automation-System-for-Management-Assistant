import React from 'react';
import { FaHome, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ContactUs.css';

const ContactUs = () => {
  const navigate = useNavigate(); // Define navigate

  return (

    <div className="contact-us-container">

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        &#8592;
      </button>

      <h1>Contact Us</h1>
      <div className="contact-details">
        
        {/* Address Section */}
        <div className="contact-item">
          <FaHome className="contact-icon" />
          <h3>Address</h3>
          <p>
            Faculty of Engineering, <br />University of Jaffna, <br />
            Ariviyal Nagar, <br /> Kilinochchi, <br />44000, <br />Sri Lanka
          </p>
        </div>

        {/* Phone Section */}
        <div className="contact-item">
          <FaPhone className="contact-icon" />
          <h3>Phone</h3>
          <p>Department of Civil Engineering: <br /><a href="tel:+94212060167">+94-21-2060167</a></p>
          <p>Department of Computer: <br /><a href="tel:+94212222111">+94-21-2222111</a></p>
          <p>Department of Electrical & Electronic: <br /><a href="tel:+94212282209">+94-21-2282209</a></p>
          <p>Department of Mechanical and Processing Engineering: <br /><a href="tel:+94212282210">+94-21-2282210</a></p>
          <p>Department of Inter Disciplinary Studies: <br /><a href="tel:+94212282210">+94-21-2282210</a>, <a href="tel:+94212282211">+94-21-2282211</a></p>
          <p>Assistant Registrar's Office: <br /><a href="tel:+94212060161">+94-21-2060161</a></p>
          <p>Dean's Office: <br /><a href="tel:+94212060160">+94-21-2060160</a></p>
        </div>

        {/* Email Section */}
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <h3>Email</h3>
          <p>Office: <br /><a href="mailto:deanoffice@eng.jfn.ac.lk">deanoffice@eng.jfn.ac.lk</a></p>
          <p>Dean: <br /><a href="mailto:dean@eng.jfn.ac.lk">dean@eng.jfn.ac.lk</a></p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
