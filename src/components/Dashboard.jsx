import React, { useEffect, useState } from 'react';
import { useParticipants } from '../context/ParticipantsContext';
import { getUsedNumbers } from '../data/raffleService';
import ParticipantList from './ParticipantList';

export default function Dashboard() {
  // Pega participantes do contexto para reatividade
  const { participants } = useParticipants();

  const totalNumbers = 3500;
  const [sold, setSold] = useState(0);
  const [collected, setCollected] = useState(0);

  useEffect(() => {
    // Recalcula sempre que a lista de participantes muda
    const used = getUsedNumbers();
    const soldCount = Array.isArray(used) ? used.length : 0;
    setSold(soldCount);
    setCollected(soldCount); // R$1 por número
  }, [participants]);

  return (
    <div className="card">
      <div className="card-header">
        <h3>📊 Resumo da Rifa</h3>
      </div>
      <div className="card-body">
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Total de números:</strong> {totalNumbers}
          </li>
          <li className="list-group-item">
            <strong>Vendidos:</strong> {sold}
          </li>
          <li className="list-group-item">
            <strong>Disponíveis:</strong> {totalNumbers - sold}
          </li>
          <li className="list-group-item">
            <strong>Valor arrecadado:</strong> R$ {collected.toFixed(2)}
          </li>
        </ul>
      </div>

      {/* Lista de participantes */}
      <ParticipantList />
    </div>
  );
}
