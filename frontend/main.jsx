/*
==================================================
File: main entry (index.js)
Summary:
- Input: HTML page with a root element where the React app will be mounted.
- Process:
  1. Imports React and ReactDOM to render React components.
  2. Imports the main App component and global CSS styles.
  3. Creates a React root at the HTML element with id "root".
  4. Renders the App inside React.StrictMode for better error detection during development.
- Output: The React application is loaded and displayed in the browser.
==================================================
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App.jsx'; // Main component containing routes and pages
import './index.css'; // Global styles including TailwindCSS

// -------------------------------------------------
// Create React root and render the App
// -------------------------------------------------
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* Main application */}
  </React.StrictMode>
);
