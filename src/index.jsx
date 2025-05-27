// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import { register } from './serviceWorker'; // Import the register function

// Render the app
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Register the service worker for PWA support
register();
