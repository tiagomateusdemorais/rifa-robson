import React, { useEffect, useState } from 'react';
import { useParticipants } from '../context/ParticipantsContext';
import { getUsedNumbers } from '../data/raffleService';
import ParticipantList from './ParticipantList';

export default function Dashboard() {
  const { participants } = useParticipants();
  const [sold, setSold] = useState(0);
  const [total] = useState(3500);
  const [collected, setCollected] = useState(0);

  useEffect(() => {
    const soldNumbers = getUsedNumbers().length;
    setSold(soldNumbers);
    setCollected(soldNumbers); // R$1 por número
  }, [participants]); // <== Recalcula quando participantes mudam

  return (
    <div className="card">
      <div className="card-header">
        <h3>📊 Resumo da Rifa</h3>
      </div>
      <div className="card-body">
        <ul className="list-group">
          <li className="list-group-item">
            <strong>Total de números:</strong> 3500
          </li>
          <li className="list-group-item">
            <strong>Vendidos:</strong> {sold}
          </li>
          <li className="list-group-item">
            <strong>Disponíveis:</strong> {total - sold}
          </li>
          <li className="list-group-item">
            <strong>Valor arrecadado:</strong> R$ {collected.toFixed(2)}
          </li>
        </ul>
      </div>

      <ParticipantList />
    </div>
  );
}
