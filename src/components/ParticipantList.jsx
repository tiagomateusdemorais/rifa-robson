import React from 'react';
import { useParticipants } from '../context/ParticipantsContext';

export default function ParticipantList() {
  const { participants, removeParticipant } = useParticipants();

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este participante?')) {
      removeParticipant(id);
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
                  Deletar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
