import React, { useContext } from "react";
import "./MAPage.css";
import Sidebar from "../Sidebar/Sidebar";
import UserInfo from "../UserInfo/UserInfo";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext"; 

const MAPage = () => {
  const { isAuthenticated } = useContext(AuthContext); 
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="ma-page">
      <Sidebar />
      <UserInfo username="John Doe" profilePicture="https://via.placeholder.com/40" />

      <div className="main-content">
        <h1>Welcome to Faculty Of Engineering <br /> University Of Jaffna</h1>
        <p>Administration Block</p>
      </div>
    </div>
  );
};

export default MAPage;
