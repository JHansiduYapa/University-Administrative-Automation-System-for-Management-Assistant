import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsonData from "../../data.json"; // Import mock data
import "./RegisterMA.css";
import api from '../../api/api'

const RegisterMA = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    maId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Get stored MAs from localStorage or fallback to jsonData
    const storedData = JSON.parse(localStorage.getItem("managementAssistants")) || jsonData.managementAssistants;

    // Check if email already exists
    if (storedData.some((ma) => ma.email === formData.email)) {
      setError("Email already registered!");
      return;
    }

    // Add new MA
    const updatedData = [
      ...storedData,
      {
        name: formData.name,
        "MA Id": formData.maId,
        email: formData.email,
        password: formData.password,
      },
    ];

    //actual api call
    try {
      const response=await api.post('/register',
        {
          username: formData.email,
          fullName: formData.name,
          password: formData.password,
        }
      )
      console.log(response)
    } catch (error) {
      console.error(error)
    }

    // Save to localStorage
    //localStorage.setItem("managementAssistants", JSON.stringify(updatedData));

    alert("Registration successful!");
    navigate("/sign-in");
  };

  return (
    <div className="register-container">

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        &#8592; 
      </button>

      <div className="register-box">
        <h2>New MA Registration</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Name with Initials:</label>
          <input type="text" name="name" onChange={handleChange} required />

          {/* <label>MA ID:</label>
          <input type="text" name="maId" onChange={handleChange} required /> */}

          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} required />

          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" onChange={handleChange} required />

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterMA;
