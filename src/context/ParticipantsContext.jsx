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

  const addParticipant = (name, phone, numbers) => {
    const newParticipant = addParticipantToStorage(name, phone, numbers);
    setParticipants(getParticipants());
    return newParticipant;
  };

  const removeParticipant = (id) => {
    removeParticipantFromStorage(id);
    setParticipants(getParticipants());
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
