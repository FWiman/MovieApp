import React, { useState, useEffect, useRef } from "react";
import "../SearchBar/SearchBar.css";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearchOpen: boolean; // <-- add this prop
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearchOpen }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // focus the input field when it becomes visible
  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className={`search-wrapper ${isSearchOpen ? "open" : ""}`}>
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
        onKeyDown={handleKeyPress}
      />
      <button onClick={() => onSearch(query)} className="search-button">
        <FaSearch size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
