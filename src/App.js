import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import './styles/App.css'; // Global styles
import Header from './components/Header'; // Import Header component
import Home from './components/Home'; // Import the new Home component

function App() {
  return (
    <BrowserRouter>  {/* Wrap your app with BrowserRouter */}
      <div className="App">
        <Header /> {/* Add the Header component */}
        <Home />   {/* Add the Home component */}
      </div>
    </BrowserRouter>
  );
}

export default App;
