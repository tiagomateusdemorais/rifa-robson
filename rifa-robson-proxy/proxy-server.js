import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/send', async (req, res) => {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbx4ID3WRpkd8RMccXSbQrYE4vXtTxVpIEGAYuYjvU74CO5CQgJI8plhF_wux_5fOHgCWA/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => res.send('🟢 Proxy Rifa funcionando'));
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
