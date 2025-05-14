import React, { useState, useEffect } from 'react';
import { getAvailableNumbers } from '../data/raffleService';
import { useParticipants } from '../context/ParticipantsContext';

// Função helper para formatação de telefone (formato brasileiro)
const formatBRPhone = (value) => {
  const nums = value.replace(/\D/g, '');
  const part1 = nums.slice(0, 2);
  const part2 = nums.slice(2, 7);
  const part3 = nums.slice(7, 11);
  if (part3) return `(${part1}) ${part2}-${part3}`;
  if (part2) return `(${part1}) ${part2}`;
  if (part1) return `(${part1}`;
  return nums;
};

export default function ParticipantForm() {
  const { addParticipant } = useParticipants();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [availableNumbers, setAvailableNumbers] = useState([]);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const numbersPerPage = 200;

  useEffect(() => {
    const available = getAvailableNumbers(page, numbersPerPage);
    setAvailableNumbers(available);
    // Scroll automático ao topo da grade
    const grid = document.querySelector('.number-grid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page]);

  const toggleNumber = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(formatBRPhone(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      addParticipant(name, phone, selectedNumbers);
      // Envia para Google Sheets via Apps Script
      const endpoint = import.meta.env.VITE_SHEET_ENDPOINT;
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, numbers: selectedNumbers }),
        });
      }
      setMessage({ type: 'success', text: '✅ Participante cadastrado com sucesso!' });
      setName('');
      setPhone('');
      setSelectedNumbers([]);
      setAvailableNumbers(getAvailableNumbers(page, numbersPerPage));
    } catch (err) {
      setMessage({ type: 'danger', text: `❌ ${err.message}` });
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>👤 Cadastrar Participante</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            className="form-control mb-2"
            placeholder="Nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            required
            type="tel"
            className="form-control mb-2"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={handlePhoneChange}
          />

          <p className="mb-2">
            🎯 <strong>{selectedNumbers.length}</strong> número(s) selecionado(s) |
            Exibindo <strong>{availableNumbers.length}</strong> de 3500
          </p>

          <div className="number-grid mb-3">
            {availableNumbers.map(({ number, available }) => {
              const isSelected = selectedNumbers.includes(number);
              return (
                <label key={number}>
                  <input
                    type="checkbox"
                    disabled={!available}
                    checked={isSelected}
                    onChange={() => toggleNumber(number)}
                  />
                  <span>
                    {isSelected ? '✅' : available ? number : '🔒'}
                  </span>
                </label>
              );
            })}
          </div>

          <div className="form-footer mt-4">
            <button type="submit" className="btn btn-primary w-100 mb-3">
              💾 Salvar Participante
            </button>

            <div className="pagination-controls w-100 d-flex justify-content-between align-items-center flex-wrap">
              <button
                type="button"
                className="btn btn-outline-primary flex-fill me-2 mb-2"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
              >
                ⬅️ Anterior
              </button>

              <span className="text-center flex-fill mb-2">
                Página <strong>{page}</strong>
              </span>

              <button
                type="button"
                className="btn btn-outline-primary flex-fill ms-2 mb-2"
                onClick={() => setPage((prev) => prev + 1)}
              >
                Próxima ➡️
              </button>
            </div>
          </div>
        </form>

        {message && (
          <div className={`alert alert-${message.type} mt-2`}>{message.text}</div>
        )}
      </div>
    </div>
  );
}
