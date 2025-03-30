import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "" : "hidden"; // Disable/enable body scroll
  };

  const closeSidebar = () => {
    setIsOpen(false);
    document.body.style.overflow = ""; // Re-enable body scroll
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
        <span className="toggle-icon">{isOpen ? "❌" : "☰"}</span>
      </button>

      {/* Overlay (closes sidebar when clicked) */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <nav className={`sidebar-container ${isOpen ? "open" : "closed"}`} aria-label="Main Sidebar">
        <ul className="sidebar-menu">
          <li>
            <Link to="/time-table" onClick={closeSidebar}>
              <span className="icon timetable-icon"></span> Time Table
            </Link>
          </li>
          <li>
            <Link to="/personal-details" onClick={closeSidebar}>
              <span className="icon newstudent-icon"></span> New Student
            </Link>
          </li>
          <li>
            <Link to="/grades" onClick={closeSidebar}>
              <span className="icon grades-icon"></span> Grades
            </Link>
          </li>
          <li>
            <Link to="/advisor" onClick={closeSidebar}>
              <span className="icon advisor-icon"></span> Advisor
            </Link>
          </li>
          <li>
            <Link to="/advisee" onClick={closeSidebar}>
              <span className="icon advisee-icon"></span> Advisee
            </Link>
          </li>
          <li>
            <Link to="/coordinator" onClick={closeSidebar}>
              <span className="icon coordinator-icon"></span> Coordinator
            </Link>
          </li>
          <li>
            <Link to="/lecture-details" onClick={closeSidebar}>
              <span className="icon lecture-icon"></span> Lecture Details
            </Link>
          </li>
          <li>
            <Link to="/student-details" onClick={closeSidebar}>
              <span className="icon student-icon"></span> Student Details
            </Link>
          </li>
          <li>
            <Link to="/contact-us" onClick={closeSidebar}>
              <span className="icon contact-icon"></span> Contact Us
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={closeSidebar}>
              <span className="icon settings-icon"></span> Settings
            </Link>
          </li>
          <li>
            <Link to="/SignInPage" onClick={closeSidebar}>
              <span className="icon logout-icon"></span> Log Out
            </Link>
          </li>
          <li>
            <Link to="/create-batch" onClick={closeSidebar}>
              <span className="icon student-icon"></span> Batch Details
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;