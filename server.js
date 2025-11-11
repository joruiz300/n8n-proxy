const express = require('express');
const axios = require('axios');
const app = express();

const N8N_URL = 'https://dev-n8n.sukhee.mx/webhook/chatwoot/available_actions';

app.get('/available_actions', async (req, res) => {
  try {
    const resp = await axios.get(N8N_URL);
    // Asegura que siempre accedes al primer objeto y al campo "available_actions"
    const actions = resp.data[0]?.available_actions;
    if (!actions) throw new Error('No available_actions found in response');
    res.json(actions);
  } catch(e) {
    res.status(500).json({error: e.message});
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy listo en puerto ${PORT}`));
