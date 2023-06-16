import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaHome, FaInfo, FaSearch } from "react-icons/fa";
import "../Css/Navbar.css";
import logo from "../assets/logo-placeholder.png";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">
          <FaHome size={30} />
        </Link>
        <Link to="/search" className="nav-link">
          <FaSearch size={30} />
        </Link>
      </div>
      <img src={logo} alt="Logo" className="logo" />
      <div className="nav-right">
        <Link to="/about" className="nav-link">
          <FaInfo size={30} />
        </Link>
        <Link to="/contact" className="nav-link">
          <FaEnvelope size={30} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
