import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => (
  <div style={{ width: "100%", height: "100vh", overflow: "hidden", position: "relative" }}>
    <style>
      {`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px); /* Start slightly below */
          }
          100% {
            opacity: 1;
            transform: translateY(0); /* Move to the original position */
          }
        }

        @keyframes floatIn {
          0% {
            opacity: 0;
            transform: translateY(40px); /* Start lower */
          }
          100% {
            opacity: 1;
            transform: translateY(0); /* Final position */
          }
        }

        .fade-in-title {
          opacity: 0;
          animation: fadeInUp 1.5s ease-out forwards;
          animation-delay: 0.5s;
        }

        .fade-in-subtitle {
          opacity: 0;
          animation: fadeInUp 1.5s ease-out forwards;
          animation-delay: 1s;
        }

        .float-in-button {
          opacity: 0;
          animation: floatIn 1.5s ease-out forwards;
          animation-delay: 1.5s;
          transition: opacity 0.5s ease-out; /* Added transition */
        }
      `}
    </style>

    <div style={{
      position: "relative",
      width: "100%",
      height: "100%",
    }}>
      {/* Dark Overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark overlay with 70% opacity
        zIndex: 1, // Overlay below text but above image
      }}></div>

      {/* Image with Explicit Dimensions */}
      <div style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden", // Ensures image doesn't overflow
      }}>
        <img
          src={require("../assets/stock.png")}
          alt="Financial Advisor"
          loading="lazy" // Lazy loading attribute
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures the image covers the area fully without distortion
            transform: "scaleX(-1)", // Flipping the image
            zIndex: 0, // Placing the image below the overlay
          }}
        />
      </div>

      {/* Text Overlay */}
      <div style={{
        position: "absolute",
        top: "35%", // Adjust this for vertical positioning
        left: "7%", // Adjust this for horizontal positioning
        zIndex: 2, // Ensures text is above both the image and overlay
        textAlign: "left", // Left-align the text
        color: "white", // White text for better contrast on dark overlay
      }}>
        <div className="fade-in-title" style={{
          backgroundImage: "linear-gradient(to right, #2A9D8F, rgb(64, 101, 180))",
          color: "transparent", // Makes the text color transparent
          fontSize: "60px", // Font size
          fontWeight: "bold", // Bold text
          width: "100%",
          backgroundClip: "text", // Clips the background to the text
          WebkitBackgroundClip: "text", // For Safari compatibility
        }}>
          Unlock Your Investment Potential
        </div>
        <div className="fade-in-subtitle" style={{
          color: "white",
          fontSize: "20px",
          paddingBottom: "40px",
          paddingTop: "20px",
          width: "60%",
          lineHeight: "30px",
        }}>
          Transforming financial advising through cutting-edge AI insights, empowering advisors to make smarter, data-driven decisions.
        </div>
        <Link to="/login?register" className="fade-in-subtitle" style={{ textDecoration: "none" }}>
          <Button
            label="Start Now"
            className="float-in-button"
            style={{
              fontSize: "15px",
            }}
          />
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
