// import React from "react";
import "../style/Header.css";
import logo from "../icons/logo.png";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className="user-info">
        <div className="user-avatar">JR</div>
        <div className="user-details">
          <span className="user-name">Lea Salikov</span>
          <span className="user-email">company@email.com</span>
        </div>
      </div>
    </header>
  );
};

export default Header;