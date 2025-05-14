// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ParticipantsProvider } from './context/ParticipantsContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/rifa-robson">
      <ParticipantsProvider>
        <App />
      </ParticipantsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
