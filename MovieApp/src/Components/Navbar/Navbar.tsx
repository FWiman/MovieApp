import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext/userContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaHome, FaInfo, FaSearch } from "react-icons/fa";
import "../../Css/Navbar.css";
import logo from "../../assets/passale3.png";
import SearchBar from "../SearchBar/SearchBar";

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { isUserLoggedIn } = useContext(UserContext)!;

  if (!isUserLoggedIn) {
    return null;
  }

  const handleSearch = (query: string) => {
    setIsSearchOpen(false);
    navigate(`/search?query=${query}`);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="logo" />
        <Link
          to="/trending"
          className="nav-link"
          onClick={() => setIsSearchOpen(false)}
        >
          <FaHome size={30} color={"#e1cc92"} />
        </Link>
        <FaSearch
          size={30}
          color={"#e1cc92"}
          className={`nav-link ${isSearchOpen ? "open" : ""}`}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        />
        {isSearchOpen && (
          <SearchBar onSearch={handleSearch} isSearchOpen={isSearchOpen} />
        )}
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
