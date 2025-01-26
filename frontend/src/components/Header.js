import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "../styles/Header.css";

function Header() {
  return (
    <header className="Header">
      {/* Logo Section */}
      <Link to="/" className="Header-logo-link">
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontFamily: "Inter, Sans-Serif",
              fontSize: "24px",
              fontWeight: "bold",
              lineHeight: "1.2",
            }}
          >
            <span style={{ color: "#2A9D8F" }}>Fin</span>
            <span style={{ color: "#264653" }}>Match</span>
          </div>
        </div>
      </Link>

      {/* Link styled as a Button (without link styles) */}
      <div>
        {/* <Link to="/login?login" style={{ textDecoration: "none"}}>
          <Button label="Login" style={{fontSize:"15px"}}/>
        </Link> */}
        <Link to="/" style={{ textDecoration: "none"}}>
          <Button label="Logout" style={{fontSize:"15px"}}/>
        </Link>
      </div>
    </header>
  );
}

export default Header;
