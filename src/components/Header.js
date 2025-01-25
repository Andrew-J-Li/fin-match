import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../styles/Header.css'; // Now pointing to Header.css in the styles folder
import logo from '../assets/lpl-financial-logo.png'; // Path to the logo image

function Header() {
  return (
    <header className="Header">
      <Link to="/" className="Header-logo-link">
      <div style = {{display: "flex"}}>
      <div style={{ fontFamily: "Inter, Sans-Serif", fontSize: "24px", fontWeight: "bold", lineHeight: "1.2" }}>
        <span style={{ color: "#2A9D8F" }}>Fin</span>
        <span style={{ color: "#264653" }}>Match</span>
      </div>
      </div>
      </Link>
    </header>
  );
}

export default Header;