import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEYS = {
  PARTICIPANTS: 'raffle_participants',
  DRAW_HISTORY: 'raffle_draws',
};

export function getAllNumbers() {
  return Array.from({ length: 3500 }, (_, i) => i + 1);
}

export function getParticipants() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PARTICIPANTS)) || [];
}

export function saveParticipants(participants) {
  localStorage.setItem(STORAGE_KEYS.PARTICIPANTS, JSON.stringify(participants));
}

export function addParticipant(name, phone, numbers, id = uuidv4()) {
  const participants = getParticipants();

  // Verifica duplicata
  const existing = participants.find(p => p.name === name && p.phone === phone);
  if (existing) {
    // Atualiza participante existente
    existing.numbers = [...new Set([...existing.numbers, ...numbers])];
    saveParticipants(participants);
    return existing;
  }

  const usedNumbers = getUsedNumbers();
  const hasConflict = numbers.some((num) => usedNumbers.includes(num));
  if (hasConflict) throw new Error('Um ou mais números já estão atribuídos.');

  const newParticipant = {
    id,
    name,
    phone,
    numbers,
  };

  participants.push(newParticipant);
  saveParticipants(participants);
  return newParticipant;
}

export function getUsedNumbers() {
  const participants = getParticipants();
  return participants.flatMap((p) => p.numbers);
}

export function getAvailableNumbers(page = 1, perPage = 200) {
  const allNumbers = getAllNumbers();
  const usedSet = new Set(getUsedNumbers());

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const pageNumbers = allNumbers.slice(start, end);

  return pageNumbers.map((num) => ({
    number: num,
    available: !usedSet.has(num),
  }));
}

export function getDrawHistory() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.DRAW_HISTORY)) || [];
}

export function saveDraw(draw) {
  const history = getDrawHistory();
  history.push(draw);
  localStorage.setItem(STORAGE_KEYS.DRAW_HISTORY, JSON.stringify(history));
}

export function drawWinners() {
  const participants = getParticipants();
  const soldNumbers = participants.flatMap((p) =>
    p.numbers.map((n) => ({ number: n, participant: p }))
  );

  if (soldNumbers.length < 3) throw new Error('São necessários pelo menos 3 números vendidos.');

  const shuffled = soldNumbers.sort(() => 0.5 - Math.random());
  const selected = [];

  const used = new Set();
  for (const entry of shuffled) {
    if (!used.has(entry.number)) {
      used.add(entry.number);
      selected.push(entry);
    }
    if (selected.length === 3) break;
  }

  const draw = {
    id: uuidv4(),
    date: new Date().toISOString(),
    results: selected.map((entry, idx) => ({
      place: idx + 1,
      number: entry.number,
      name: entry.participant.name,
      phone: entry.participant.phone,
    })),
  };

  saveDraw(draw);
  return draw;
}

export function removeParticipant(id) {
  const participants = getParticipants();
  const updated = participants.filter(p => p.id !== id);
  saveParticipants(updated);
}
