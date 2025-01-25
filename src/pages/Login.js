import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation for navigation

function Login() {

    const [isLogin, setIsLogin] = useState(true); // State to determine which form to show

  const location = useLocation();

  // Check if there's a query parameter to switch between login and register
  React.useEffect(() => {
    if (location.search === "?register") {
      setIsLogin(false); // Show register form
    } else {
      setIsLogin(true); // Show login form
    }
  }, [location]);
  return (
    <div>
      <h1>Login Page</h1>
      {/* Your login form or content here */}
    </div>
  );
}

export default Login;
