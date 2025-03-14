import React, { useContext } from "react";
import "./MAPage.css";
import Sidebar from "../Sidebar/Sidebar";
import UserInfo from "../UserInfo/UserInfo";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext"; // Import mock authentication context

const MAPage = () => {
  const { isAuthenticated } = useContext(AuthContext); // Access authentication state
  const navigate = useNavigate();

  if (!isAuthenticated) {
    // Redirect unauthenticated users back to SignInPage
    navigate("/");
    return null;
  }

  return (
    <div className="ma-page">

      {/* Sidebar */}
      <Sidebar />

      {/* User Info */}
      <UserInfo username="John Doe" profilePicture="https://via.placeholder.com/40" />

      {/* Main Content */}
      <div className="main-content">
        <h1>
            Welcome to Faculty Of Engineering <br />
            University Of Jaffna
        </h1>
        <p>Administration Block</p>
        </div>
    </div>
  );
};

export default MAPage;
