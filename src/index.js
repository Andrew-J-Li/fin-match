import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'; // Global styles
import App from './App';
import reportWebVitals from './reportWebVitals';

// Add the Google Fonts link for 'Inter' font to the document head
const interFontLink = document.createElement('link');
interFontLink.rel = 'stylesheet';
interFontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap';
document.head.appendChild(interFontLink);

const rechtFontLink = document.createElement('link');
rechtFontLink.rel = 'stylesheet';
rechtFontLink.href = 'https://fonts.googleapis.com/css2?family=Recht:wght@400;700&display=swap'; // Adjust this if you have a different URL
document.head.appendChild(rechtFontLink);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();