import React from 'react';
import './styles/App.css'; // Global styles
import Header from './components/Header'; // Import Header component
import Home from './components/Home'; // Import the new Home component

function App() {
  return (
    <div className="App">
      <Header /> {/* Add the Header component */}
      <Home />   {/* Add the Home component */}
    </div>
  );
}

export default App;
