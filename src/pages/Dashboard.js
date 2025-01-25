// Dashboard.js
import React from "react";
import Newscard from "../components/Newscard";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: '1', padding: '20px', display: 'flex', flexWrap: 'wrap', marginTop:'70px' }}>
        <Newscard />
        <Newscard />
        <Newscard />
        {/* Add more cards as needed */}
      </div>
      <Sidebar />
    </div>
  );
};

export default Dashboard;