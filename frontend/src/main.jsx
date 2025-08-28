/*
==================================================
File: index.jsx
Summary:
- Input: The root HTML element with id "root".
- Process:
  1. Imports React and ReactDOM utilities.
  2. Imports global CSS styles.
  3. Imports the main App component.
  4. Creates a React root and renders the App component inside React's StrictMode.
- Output: Mounts the React application to the DOM.
==================================================
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// -------------------------
// Section: Create root and render app
// -------------------------
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
