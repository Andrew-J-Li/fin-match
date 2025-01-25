// Dashboard.js
import React from "react";
import Newscard from "../components/Newscard";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div
        style={{
          flex: '1',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginTop: '70px',
        }}
      >
        <Newscard />
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
