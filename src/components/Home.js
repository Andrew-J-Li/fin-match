import React from 'react';
import Button from './Button';
import styles from '../styles/Home.css';
import { Briefcase, Target, UserCheck, MessageSquare } from 'lucide-react';

const Home = () => (
  <div style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}>
    <div style={{
      position: "relative",
      width: "100%",
      height: "100%"
    }}>
      {/* Dark Overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",  // Dark overlay with 70% opacity
        zIndex: 1  // Overlay below text but above image
      }}></div>

      <img
        src={require('../assets/stock.png')}
        alt="Financial Advisor"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",  // Ensures the image covers the area fully without distortion
          transform: "scaleX(-1)", // Flipping the image
          zIndex: 0,  // Placing the image below the overlay
        }}
      />

      {/* Text Overlay */}
      <div style={{
        position: "absolute",
        top: "35%", // Adjust this for vertical positioning
        left: "7%", // Adjust this for horizontal positioning
        zIndex: 2,  // Ensures text is above both the image and overlay
        textAlign: "left", // Left-align the text
        color: "white", // White text for better contrast on dark overlay
      }}>
        <div style={{
          color: "#2A9D8F",
          fontSize: "60px", // Font size
          fontWeight: "bold", // Bold text
          width: "100%"
        }}>
          Unlock Your Investment Potential
        </div>
        <div style={{ color: "white", fontSize: "20px", paddingBottom: "50px", paddingTop: "10px", width: "60%"}}>
          Revolutionizing the way you invest with seamless AI-matching between prospective investors and financial advisors.
        </div>
        <Button label="Start Now" />
      </div>

    </div>
  </div>
);

export default Home;