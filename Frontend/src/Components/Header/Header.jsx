import "./Header.css";
import UniLogo from "../../assets/Uni Logo.png";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // Import the ThemeContext

const Header = () => {
  const { toggleDarkMode, darkMode } = useContext(ThemeContext); // Access dark mode state and toggle function
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default link behavior
    localStorage.removeItem("token"); // Clear user session
    navigate("/SignIN"); // Redirect to SignIn page
  };

  return (
    <header className={`header ${darkMode ? 'dark-mode' : ''}`}> {/* Add 'dark-mode' class when darkMode is true */}
      <div className="header-left">
        {/* University Logo */}
        <img src={UniLogo} alt="University Logo" className="uni-logo" />
        <div className="header-text">
          <h1>FACULTY OF ENGINEERING</h1>
          <h2>UNIVERSITY OF JAFFNA</h2>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="header-nav">
        <Link to="/contact-us">Contact Us</Link> {/* Correct navigation */}
        <Link to="/SignInPage" onClick={handleLogout}>Log Out</Link> {/* Logout as a link */}
        {/* Add a placeholder route for Settings */}
        <Link to="/settings">Settings</Link>
      </nav>

      {/* Dark Mode Toggle */}
      <div className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "🌙" : "🌞"} {/* Display moon for dark mode, sun for light mode */}
      </div>
    </header>
  );
};

export default Header;