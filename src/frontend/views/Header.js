import React from "react";
import "../App.css";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <div className="section-header">
      Welcome to Siftr
      <SearchBox />
    </div>
  );
};

export default Header;
