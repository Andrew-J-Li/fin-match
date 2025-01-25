import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter for routing
import './styles/App.css'; // Global styles
import Header from './components/Header'; // Import Header component
import Home from './pages/Home'; // Import the new Home component
import Login from './pages/Login'; // Import the Login component
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>  {/* Wrap your app with BrowserRouter */}
      <div className="App">
        <Header /> {/* Header will be present on all pages */}
        
        <Routes>
          {/* Route for the Home page */}
          <Route path="/" element={<Home />} />
          
          {/* Route for the Login page */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
