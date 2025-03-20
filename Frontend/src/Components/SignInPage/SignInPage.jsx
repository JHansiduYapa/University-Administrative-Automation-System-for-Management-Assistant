import React, { useContext } from "react";
import "./SignInPage.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext"; // Import mock authentication context

const SignInPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext); // Access authentication state

  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent form submission behavior
    setIsAuthenticated(true); // Simulate successful login
    navigate("/ma-page"); // Navigate to MAPage
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <label>Email Address:</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password:</label>
          <input type="password" placeholder="Enter your password" required />

          <button type="submit">Sign In</button>
        </form>
        <p className="create-new">Create New</p>
      </div>
    </div>
  );
};

export default SignInPage;