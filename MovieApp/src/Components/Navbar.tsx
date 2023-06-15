import React from "react";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/search" className="nav-link">
          Search
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/contact" className="nav-link">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
