import React from 'react';
import '../styles/Header.css'; // Now pointing to Header.css in the styles folder
import logo from '../assets/lpl-financial-logo.png'; // Path to the logo image

function Header() {
  return (
    <header className="Header">
      <img src={logo} className="Header-logo" alt="LPL Financial logo" />
    </header>
  );
}

export default Header;
