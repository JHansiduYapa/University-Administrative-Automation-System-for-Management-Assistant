import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
        <i className="toggle-icon">{isOpen ? "❌" : "☰"}</i>
      </button>

      {/* Overlay (closes sidebar when clicked) */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <nav className={`sidebar-container ${isOpen ? "open" : "closed"}`} aria-label="Main Sidebar">
        <ul className="sidebar-menu">
          <li>
            <Link to="/time-table" onClick={closeSidebar}>
              <i className="icon timetable-icon"></i> Time Table
            </Link>
          </li>
          <li>
            <Link to="/personal-details" onClick={closeSidebar}>
              <i className="icon newstudent-icon"></i> New Student
            </Link>
          </li>
          <li>
            <Link to="/grades" onClick={closeSidebar}>
              <i className="icon grades-icon"></i> Grades
            </Link>
          </li>
          <li>
            <Link to="/advisor" onClick={closeSidebar}>
              <i className="icon advisor-icon"></i> Advisor
            </Link>
          </li>
          <li>
            <Link to="/advisee" onClick={closeSidebar}>
              <i className="icon advisee-icon"></i> Advisee
            </Link>
          </li>
          <li>
            <Link to="/coordinator" onClick={closeSidebar}>
              <i className="icon coordinator-icon"></i> Coordinator
            </Link>
          </li>
          <li>
            <Link to="/lecture-details" onClick={closeSidebar}>
              <i className="icon lecture-icon"></i> Lecture Details
            </Link>
          </li>
          <li>
            <Link to="/student-details" onClick={closeSidebar}>
              <i className="icon student-icon"></i> Student Details
            </Link>
          </li>
          <li>
            <Link to="/contact-us" onClick={closeSidebar}>
              <i className="icon contact-icon"></i> Contact Us
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={closeSidebar}>
              <i className="icon settings-icon"></i> Settings
            </Link>
          </li>
          <li>
            <Link to="/logout" onClick={closeSidebar}>
              <i className="icon logout-icon"></i> Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
