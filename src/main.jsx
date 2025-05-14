// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ParticipantsProvider } from './context/ParticipantsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParticipantsProvider>
      <App />
    </ParticipantsProvider>
  </React.StrictMode>
);
