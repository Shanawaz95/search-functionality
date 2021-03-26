import React from "react";
import "./SearchBar.css";

function SearchBar({ change }) {
  return (
    <div className="search-wrapper">
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
