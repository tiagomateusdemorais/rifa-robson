import React from 'react';
import { useParticipants } from '../context/ParticipantsContext';

export default function ParticipantList() {
  const { participants, removeParticipant } = useParticipants();

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este participante?')) return;

    // Remove localmente
    removeParticipant(id);

    // Envia ação de exclusão para a planilha via proxy
    try {
      const response = await fetch('https://rifa-robson-proxy.onrender.com/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          action: 'delete',
        }),
      });

      const result = await response.json();

      if (result.status !== 'deleted') {
        console.warn('⚠️ Não foi possível deletar na planilha:', result);
      }
    } catch (err) {
      console.error('❌ Erro ao comunicar com o proxy:', err.message);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h3>👥 Participantes</h3>
      </div>
      <div className="card-body">
        {participants.length === 0 ? (
          <p>Nenhum participante cadastrado.</p>
        ) : (
          <ul className="list-group">
            {participants.map((participant) => (
              <li
                key={participant.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{participant.name}</strong> <br />
                  📞 {participant.phone} <br />
                  🎟️ Números: {participant.numbers.join(', ')}
                </div>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(participant.id)}
                >
                  🗑️ Deletar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
