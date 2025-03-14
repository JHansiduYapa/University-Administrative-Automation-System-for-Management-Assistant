import React from "react";
import "./UserInfo.css";

const UserInfo = ({ username = "User", profilePicture = "https://via.placeholder.com/40" }) => {
  return (
    <div className="user-info-container">
      <img src={profilePicture} alt="User Icon" className="user-icon" />
      <span className="user-name">{username}</span>
    </div>
  );
};

export default UserInfo;
