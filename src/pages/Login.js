import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(""); // New state for name
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.search === "?register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ name, username, password }); // Log name along with other fields
    navigate("/dashboard");
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    fontFamily: "Inter, sans-serif",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "400px",
    padding: "32px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Inter, sans-serif",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333333",
    marginBottom: "8px",
    fontFamily: "Inter, sans-serif",
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#666666",
    marginBottom: "24px",
    fontFamily: "Inter, sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    margin: "8px 0",
    border: "1px solid #cccccc",
    borderRadius: "8px",
    boxSizing: "border-box",
    fontFamily: "Inter, sans-serif",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#2A9D8F",
    color: "#ffffff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "16px",
    fontFamily: "Inter, sans-serif",
  };

  const linkContainerStyle = {
    marginTop: "16px",
    textAlign: "center",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
  };

  const linkStyle = {
    color: "#2A9D8F",
    textDecoration: "none",
    marginLeft: "4px",
    fontFamily: "Inter, sans-serif",
  };

  const checkboxContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "16px",
    fontSize: "14px",
    fontFamily: "Inter, sans-serif",
  };

  const socialContainerStyle = {
    marginTop: "24px",
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "Inter, sans-serif",
  };

  const socialIconStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2A9D8F",
    cursor: "pointer",
    fontFamily: "Inter, sans-serif",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>
          {isLogin ? "Login" : "Register"}
        </h1>
        <p style={subtitleStyle}>
          {isLogin
            ? "Sign in to your account."
            : "Create your account to get started."}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" style={{ display: "none" }}>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
          )}

          <div>
            <label htmlFor="username" style={{ display: "none" }}>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Email"
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: "none" }}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
            {isLogin && (
              <Link to="/forgot-password" style={{ ...linkStyle, float: "right", fontSize: "12px" }}>
                Forgot Password?
              </Link>
            )}
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirmPassword" style={{ display: "none" }}>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
          )}

          {isLogin && (
            <div style={checkboxContainerStyle}>
              <label>
                <input type="checkbox" style={{ marginRight: "8px" }} /> Remember Me
              </label>
            </div>
          )}

          <button type="submit" style={buttonStyle}>
            {isLogin ? "Sign in" : "Register"}
          </button>
        </form>

        <div style={linkContainerStyle}>
          {isLogin ? (
            <p>
              New on our platform?
              <Link to="/login?register" style={linkStyle}>
                Create an account
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?
              <Link to="/login" style={linkStyle}>
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
