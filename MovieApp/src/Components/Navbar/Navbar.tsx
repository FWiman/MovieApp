import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaHome, FaInfo, FaSearch } from "react-icons/fa";
import "../../Css/Navbar.css";
import logo from "../../assets/passale3.png";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" />
        <Link to="/" className="nav-link">
          <FaHome size={30} color={"#e1cc92"} />
        </Link>
        <Link to="/search" className="nav-link">
          <FaSearch size={30} color={"#e1cc92"} />
        </Link>
      </div>
      <div className="nav-center">
        <span className="navbar-text">FlickFinder</span>
      </div>
      <div className="nav-right">
        <Link to="/about" className="nav-link">
          <FaInfo size={30} color={"#e1cc92"} />
        </Link>
        <Link to="/contact" className="nav-link">
          <FaEnvelope size={30} color={"#e1cc92"} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
