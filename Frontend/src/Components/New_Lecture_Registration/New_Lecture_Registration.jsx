import React, { useState, useEffect } from 'react';
import './New_Lecture_Registration.css';
import jsonData from '../../data.json';
import { FaUserPlus, FaUniversity, FaEnvelope, FaPhone, FaGraduationCap, FaIdCard } from 'react-icons/fa';
//import { Form, Input, Button, Space, Select } from 'antd';
//import axios from 'axios';
//const api = "http://localhost:9080/api/";

/*    // Fetch available departments from the backend on mount
  useEffect(() => {
    axios.get(api + "departments")
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error("Error fetching departments:", error);
      });
  }, []);
   */
const New_Lecture_Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    qualifications: '',
    post: '',
    department: '',
    email: '',
    phone: ''
  });
  
  const [departments, setDepartments] = useState([]);
  const [posts, setPosts] = useState(['Professor', 'Senior Lecturer Grade I', 'Senior Lecturer Grade II', 'Lecturer', 'Assistant Lecturer']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Extract unique departments from JSON data
    if (jsonData && jsonData.lecturers) {
      const uniqueDepartments = [...new Set(jsonData.lecturers.map(lecturer => lecturer.department))];
      setDepartments(uniqueDepartments);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleQualificationChange = (e) => {
    // Convert newline-separated text to array
    setFormData({
      ...formData,
      qualifications: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    if (!formData.name || !formData.department || !formData.email || !formData.post) {
      setMessage({ text: 'Please fill all required fields', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    // Phone validation
    const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      setMessage({ text: 'Please enter a valid phone number', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Create new lecturer object
      const newLecturer = {
        id: Math.floor(Math.random() * 1000) + 300, // Generate random ID
        name: formData.name,
        qualifications: formData.qualifications.split('\n').filter(q => q.trim() !== ''),
        post: formData.post,
        department: formData.department,
        email: formData.email,
        phone: formData.phone || ''
      };

      console.log('New lecturer registered:', newLecturer);
      
      // Reset form
      setFormData({
        name: '',
        qualifications: '',
        post: '',
        department: '',
        email: '',
        phone: ''
      });
      
      setMessage({ text: 'Lecturer registered successfully!', type: 'success' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="lecture-registration-container">
      <h2><FaUserPlus className="header-icon" /> New Lecturer Registration</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="name">
            <FaIdCard className="input-icon" /> Full Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="qualifications">
            <FaGraduationCap className="input-icon" /> Qualifications
          </label>
          <textarea
            id="qualifications"
            name="qualifications"
            value={formData.qualifications}
            onChange={handleQualificationChange}
            placeholder="Enter qualifications (one per line)"
            rows="4"
          />
          <small className="helper-text">Example: B.Sc (Hons) in Computer Science (Jaffna)</small>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="post">
              <FaGraduationCap className="input-icon" /> Post*
            </label>
            <select
              id="post"
              name="post"
              value={formData.post}
              onChange={handleChange}
              required
            >
              <option value="">Select Post</option>
              {posts.map((post, index) => (
                <option key={index} value={post}>{post}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="department">
              <FaUniversity className="input-icon" /> Department*
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="input-icon" /> Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">
              <FaPhone className="input-icon" /> Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register Lecturer'}
          </button>
          <button 
            type="button" 
            className="reset-btn" 
            onClick={() => {
              setFormData({
                name: '',
                qualifications: '',
                post: '',
                department: '',
                email: '',
                phone: ''
              });
              setMessage({ text: '', type: '' });
            }}
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default New_Lecture_Registration;
