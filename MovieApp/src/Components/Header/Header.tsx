import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/StreamWatchLogo.svg";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.logoLinksContainer}>
          <img src={logo} alt="STREAMWATCH" className={styles.logo} />
          <div className={styles.navLinks}>
            <ul className={styles.navList}>
              <li>
                <Link to="/" className={styles.link}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className={styles.link}>
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/tvshows" className={styles.link}>
                  Series
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.searchContainer}>
          <FontAwesomeIcon
            icon={faSearch}
            className={styles.searchIcon}
            onClick={toggleSearch}
          />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            className={`${styles.searchBar} ${
              searchVisible ? styles.expanded : ""
            }`}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
