// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ParticipantsPage from './pages/ParticipantsPage';
import Dashboard from './components/Dashboard';
import DrawSection from './components/DrawSection';
import ExportButtons from './components/ExportButtons';
import ParticipantForm from './components/ParticipantForm';
import './app.css';

export default function App() {
  return (
    <Router>
      <div className="container">
        <nav className="mb-4">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link className="nav-link" to="/">🏠 Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/participantes">👥 Participantes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cadastro">📝 Cadastrar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sorteio">🎲 Sorteio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/exportar">📁 Exportar</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/participantes" element={<ParticipantsPage />} />
          <Route path="/cadastro" element={<ParticipantForm />} />
          <Route path="/sorteio" element={<DrawSection />} />
          <Route path="/exportar" element={<ExportButtons />} />
        </Routes>
      </div>
    </Router>
  );
}
