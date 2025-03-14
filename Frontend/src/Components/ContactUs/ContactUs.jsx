import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <div className="contact-details">
        {/* Address Section */}
        <div className="contact-item">
          <h3>Address</h3>
          <p>
            Faculty of Engineering, University of Jaffna, <br />
            Ariviyal Nagar, Kilinochchi, 44000, Sri Lanka
          </p>
        </div>

        {/* Phone Section */}
        <div className="contact-item">
          <h3>Phone</h3>
          <p>
            Department of Civil Engineering: <a href="tel:+94212060167">+94-21-2060167</a>
          </p>
          <p>
            Department of Computer: <a href="tel:+94212222111">+94-21-2222111</a>
          </p>
          <p>
            Department of Electrical & Electronic: <a href="tel:+94212282209">+94-21-2282209</a>
          </p>
          <p>
            Department of Mechanical and Processing Engineering: <a href="tel:+94212282210">+94-21-2282210</a>
          </p>
          <p>
            Department of Inter Disciplinary Studies: 
            <a href="tel:+94212282210">+94-21-2282210</a>, 
            <a href="tel:+94212282211">+94-21-2282211</a>
          </p>
          <p>
            Assistant Registrar's Office: <a href="tel:+94212060161">+94-21-2060161</a>
          </p>
          <p>
            Dean's Office: <a href="tel:+94212060160">+94-21-2060160</a>
          </p>
        </div>

        {/* Email Section */}
        <div className="contact-item">
          <h3>Email</h3>
          <p>
            Office: <a href="mailto:deanoffice@eng.jfn.ac.lk">deanoffice@eng.jfn.ac.lk</a>
          </p>
          <p>
            Dean: <a href="mailto:dean@eng.jfn.ac.lk">dean@eng.jfn.ac.lk</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
