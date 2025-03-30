import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterMA.css";
import api from "../../api/api";
import axios from "axios";

const RegisterMA = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
    try {
      const response = await axios.post("http://localhost:9080/api/register", {
        username: formData.email,
        fullName: formData.name,
        password: formData.password,
      });
      console.log("Registration response:", response.data);
      alert("Registration successful!");
      navigate("/sign-in");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.response?.data || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &#8592;
      </button>
      <div className="register-box">
        <h2>New MA Registration</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Name with Initials:</label>
          <input type="text" name="name" onChange={handleChange} required />
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
