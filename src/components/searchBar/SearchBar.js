import React from "react";
import "./SearchBar.css";

function SearchBar({ change }) {
  return (
    <div className="search-wrapper">
      <span>
        <i class="fas fa-search"></i>
      </span>
      <input
        className="search-inp"
        type="text"
        placeholder="Type stock name"
        onChange={change}
      ></input>
    </div>
  );
}

export default SearchBar;
