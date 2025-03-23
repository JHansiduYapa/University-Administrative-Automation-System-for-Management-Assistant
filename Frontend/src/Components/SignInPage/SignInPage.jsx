import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./SignInPage.css";
import jsonData from "../../data.json"; // Import directly from src folder

const SignInPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [managementAssistants, setManagementAssistants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from imported JSON
  useEffect(() => {
    try {
      console.log("Data loaded:", jsonData);
      if (jsonData && jsonData.managementAssistants) {
        setManagementAssistants(jsonData.managementAssistants);
      } else {
        setError("Management Assistant data not found");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setError(error.message);
      setLoading(false);
    }
  }, []);

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Attempting login with:", email, password);
    console.log("Available Assistants:", managementAssistants);

    // Check if entered email & password match any management officer
    const user = managementAssistants.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      console.log("Login successful for:", user);
      setIsAuthenticated(true);
      navigate("/ma-page");
    } else {
      alert("Invalid email or password");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <label>Email Address:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign In</button>
        </form>
        <p className="create-new">Create New</p>
      </div>
    </div>
  );
};

export default SignInPage;
