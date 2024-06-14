import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext/userContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaHome, FaInfo, FaSearch } from "react-icons/fa";
import "../Navbar/Navbar.css";
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
        <Link
          to="/trending"
          className="nav-link"
          onClick={() => setIsSearchOpen(false)}
        >
          <FaHome size={30} color={"whitesmoke"} />
        </Link>
        <FaSearch
          size={30}
          color={"whitesmoke"}
          className={`nav-link ${isSearchOpen ? "open" : ""}`}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        />
        {isSearchOpen && (
          <SearchBar onSearch={handleSearch} isSearchOpen={isSearchOpen} />
        )}
      </div>
      <div className="nav-center">
        <span className="navbar-text">STREAMWATCH</span>
      </div>
      <div className="nav-right">
        <Link to="/about" className="nav-link">
          <FaInfo size={30} color={"whitesmoke"} />
        </Link>
        <Link to="/contact" className="nav-link">
          <FaEnvelope size={30} color={"whitesmoke"} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
