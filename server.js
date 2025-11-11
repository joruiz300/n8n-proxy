const express = require('express');
const axios = require('axios');
const app = express();

const N8N_URL = 'https://dev-n8n.sukhee.mx/webhook/chatwoot/available_actions';

// Función recursiva para encontrar available_actions en cualquier profundidad
function findActions(obj) {
  // Busca recursiva el campo available_actions en cualquier profundidad
  if (!obj || typeof obj !== 'object') return null;
  if (Array.isArray(obj.available_actions)) return obj.available_actions;
  for (const key of Object.keys(obj)) {
    const found = findActions(obj[key]);
    if (found) return found;
  }
  return null;
}

app.get('/available_actions', async (req, res) => {
  try {
    const resp = await axios.get(N8N_URL);
    const actions = findActions(resp.data);
    if (!actions) throw new Error('No available_actions found in response');
    res.json(actions);
  } catch(e) {
    res.status(500).json({error: e.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy listo en puerto ${PORT}`));
