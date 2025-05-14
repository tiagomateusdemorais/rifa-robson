import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SHEET_ENDPOINT = process.env.SHEET_ENDPOINT;

if (!SHEET_ENDPOINT) {
  throw new Error('❌ Variável de ambiente SHEET_ENDPOINT não definida no .env');
}

app.use(cors());
app.use(express.json());

// Rota principal de verificação
app.get('/', (req, res) => res.send('🟢 Proxy Rifa funcionando'));

// Rota para criação ou atualização de participante
app.post('/api/send', async (req, res) => {
  const { id, name, phone, numbers, action } = req.body;

  if (!id || !action) {
    return res.status(400).json({ error: 'Campos obrigatórios: id e action.' });
  }

  try {
    const payload = {
      id,
      name,
      phone,
      numbers,
      action, // 'create', 'update', 'delete'
    };

    const response = await fetch(SHEET_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('❌ Erro no proxy:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Proxy rodando em http://localhost:${PORT}`);
});
