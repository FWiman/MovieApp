import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/StreamWatchLogo.svg";

const Header: React.FC = () => {
  const [searchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
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
        <div className={styles.searchIcon} onClick={toggleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </nav>
      {searchVisible && <SearchBar />}
    </header>
  );
};

export default Header;
