import React, { useState } from 'react';
import { drawWinners, getDrawHistory } from '../data/raffleService';

export default function DrawSection() {
  const [drawResult, setDrawResult] = useState(null);
  const [history, setHistory] = useState(getDrawHistory());
  const [error, setError] = useState('');

  const handleDraw = () => {
    try {
      const result = drawWinners();
      setDrawResult(result);
      setHistory(getDrawHistory());
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>🎉 Realizar Sorteio</h3>
      </div>
      <div className="card-body">
        <button onClick={handleDraw} className="btn btn-success mb-3">
          Sortear 3 ganhadores
        </button>
        {error && <div className="alert alert-danger">{error}</div>}

        {drawResult && (
          <div>
            <h4>Resultado do Sorteio:</h4>
            <div className="list-group">
              {drawResult.results.map((r) => (
                <div key={r.number} className="list-group-item d-flex justify-content-between">
                  <span>{r.place}º lugar</span>
                  <span>{r.name} ({r.phone})</span>
                  <span>🏆 🚲</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div>
            <h5>Histórico de Sorteios</h5>
            <ul>
              {history.map((d) => (
                <li key={d.id}>
                  <strong>{new Date(d.date).toLocaleString()}:</strong>
                  {d.results.map((r) => ` [${r.place}º - Nº ${r.number}]`).join(' ')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
