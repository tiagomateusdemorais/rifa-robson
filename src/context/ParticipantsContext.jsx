import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getParticipants,
  saveParticipants,
  addParticipant as addParticipantToStorage,
  removeParticipant as removeParticipantFromStorage,
} from '../data/raffleService';

const ParticipantsContext = createContext();

export function ParticipantsProvider({ children }) {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    setParticipants(getParticipants());
  }, []);

  const addParticipant = (name, phone, numbers, id) => {
    const newParticipant = addParticipantToStorage(name, phone, numbers, id);
    setParticipants(getParticipants());
    return newParticipant;
  };

  const removeParticipant = async (id) => {
    // Remove local
    removeParticipantFromStorage(id);
    setParticipants(getParticipants());

    // Também remove da planilha via proxy
    try {
      await fetch('https://rifa-robson-proxy.onrender.com/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'delete' }),
      });
    } catch (err) {
      console.error('Erro ao excluir da planilha:', err);
    }
  };

  return (
    <ParticipantsContext.Provider value={{ participants, addParticipant, removeParticipant }}>
      {children}
    </ParticipantsContext.Provider>
  );
}

export function useParticipants() {
  return useContext(ParticipantsContext);
}
