import React from 'react';

const Button = ({ label, onClick, style }) => {
  const buttonStyle = {
    backgroundColor: "#2A9D8F",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    ...style
  };

  const handleHover = (e) => {
    e.target.style.backgroundColor = "#21867A"; // Darker shade on hover
  };

  const handleLeave = (e) => {
    e.target.style.backgroundColor = "#2A9D8F"; // Original color on leave
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {label}
    </button>
  );
};

export default Button;
