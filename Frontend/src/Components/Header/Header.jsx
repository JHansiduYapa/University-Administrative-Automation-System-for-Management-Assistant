import "./Header.css";
import UniLogo from "../../assets/Uni Logo.png";
import { Link } from "react-router-dom"; // Import Link for navigation

const Header = () => {
  return (
    <header className="header">
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
        <Link to="/SignInPage">Log Out</Link>
        {/* Add a placeholder route for Settings */}
        <Link to="/settings">Settings</Link>
      </nav>
    </header>
  );
};

export default Header;
