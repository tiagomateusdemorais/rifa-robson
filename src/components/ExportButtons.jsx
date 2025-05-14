import React from 'react';
import { getParticipants, getDrawHistory } from '../data/raffleService';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export default function ExportButtons() {
  const exportParticipants = () => {
    const participants = getParticipants();
    const data = participants.map((p) => ({
      Nome: p.name,
      Telefone: p.phone,
      'Números Adquiridos': p.numbers.join(', '),
    }));

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'participantes.csv');
  };

  const exportDraws = () => {
    const draws = getDrawHistory();
    const rows = [];

    draws.forEach((draw) => {
      draw.results.forEach((r) => {
        rows.push({
          Data: new Date(draw.date).toLocaleString(),
          Posição: `${r.place}º`,
          Número: r.number,
          Nome: r.name,
          Telefone: r.phone,
        });
      });
    });

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'sorteios.csv');
  };

  return (
    <div className="section">
      <h2>📁 Exportar Dados</h2>
      <button onClick={exportParticipants}>Exportar Participantes (CSV)</button>{' '}
      <button onClick={exportDraws}>Exportar Sorteios (CSV)</button>
    </div>
  );
}
