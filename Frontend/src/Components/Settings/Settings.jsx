import React, { useState, useContext, useEffect } from "react";
import { FaArrowLeft, FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext"; // Ensure correct import path
import "./Settings.css";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { theme, setTheme, darkMode, setDarkMode, notification, setNotification } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedDarkMode, setSelectedDarkMode] = useState(darkMode);
  const [selectedNotification, setSelectedNotification] = useState(notification);
  
  const navigate = useNavigate();

  // Effect to apply dark mode globally
  useEffect(() => {
    if (selectedDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [selectedDarkMode]);

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
  };

  const handleDarkModeToggle = () => {
    const newDarkMode = !selectedDarkMode;
    setSelectedDarkMode(newDarkMode);
    setDarkMode(newDarkMode);
  };

  const handleNotificationToggle = () => {
    const newNotification = !selectedNotification;
    setSelectedNotification(newNotification);
    setNotification(newNotification);
  };

  return (
    <div className={`settings-container`}>
      <div className="settings-header">
        <FaArrowLeft
          className="back-icon"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="settings-options">
        {/*<div className="option">
          <h3>Theme</h3>
          <div className="theme-options">
            <div
              className={`theme-option ${selectedTheme === "light" ? "selected" : ""}`}
              onClick={() => handleThemeChange("light")}
            >
              <FaSun /> Light
            </div>
            <div
              className={`theme-option ${selectedTheme === "dark" ? "selected" : ""}`}
              onClick={() => handleThemeChange("dark")}
            >
              <FaMoon /> Dark
            </div>
          </div>
        </div>*/}
        <div className="option">
          <h3>Dark Mode</h3>
          <div className="toggle-option" onClick={handleDarkModeToggle}>
            <span>{selectedDarkMode ? "On" : "Off"}</span>
            <div className={`toggle ${selectedDarkMode ? "on" : "off"}`}></div>
          </div>
        </div>
        <div className="option">
          <h3>Notifications</h3>
          <div className="toggle-option" onClick={handleNotificationToggle}>
            <span>{selectedNotification ? "On" : "Off"}</span>
            <div className={`toggle ${selectedNotification ? "on" : "off"}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;