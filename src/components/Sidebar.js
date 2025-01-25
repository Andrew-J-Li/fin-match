// Sidebar.js
import React from "react";

const Sidebar = () => {
  return (
    <div style={{ width: '250px', backgroundColor: '#f0f0f0', padding: '10px' }}>
      <h3 style={{ fontWeight: '600', fontSize: '18px', marginBottom: '20px' }}>Recently Viewed</h3>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        <li style={{ marginBottom: '10px' }}><strong>HIT-USD</strong>: 0.00000344 (+2.14%)</li>
        <li style={{ marginBottom: '10px' }}><strong>CARZ</strong>: 60.65 (+0.56%)</li>
        <li style={{ marginBottom: '10px' }}><strong>DIA</strong>: 444.12 (-0.28%)</li>
        <li style={{ marginBottom: '10px' }}><strong>QQQ</strong>: 529.63 (-0.60%)</li>
        <li style={{ marginBottom: '10px' }}><strong>VFINX</strong>: 563.46 (-0.28%)</li>
        <li style={{ marginBottom: '10px' }}><strong>AIG</strong>: 73.78 (-1.10%)</li>
        <li style={{ marginBottom: '10px' }}><strong>NET</strong>: 125.12 (+0.96%)</li>
        <li style={{ marginBottom: '10px' }}><strong>GSHD</strong>: 100.87 (-0.96%)</li>
        <li style={{ marginBottom: '10px' }}><strong>BRK-B</strong>: 463.19 (+0.73%)</li>
        <li style={{ marginBottom: '10px' }}><strong>BK</strong>: 85.79 (+1.25%)</li>
      </ul>
    </div>
  );
};

export default Sidebar;