const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const { TRELLO_API_KEY, TRELLO_TOKEN } = process.env;

// ✅ 1. Get Boards
app.get('/api/boards', async (req, res) => {
  const response = await axios.get(`https://api.trello.com/1/members/me/boards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`);
  res.json(response.data);
});

// ✅ 2. Create Card
app.post('/api/cards', async (req, res) => {
  const { listId, name } = req.body;
  const response = await axios.post(`https://api.trello.com/1/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}&idList=${listId}&name=${name}`);
  res.json(response.data);
});

// ✅ 3. Webhook Endpoint (Trello → Your Server)
app.post('/api/webhook', (req, res) => {
  console.log('Webhook received:', req.body);
  res.sendStatus(200);
});

// ✅ 4. Register Webhook
app.post('/api/register-webhook', async (req, res) => {
  const { modelId, callbackURL } = req.body;
  const response = await axios.post(`https://api.trello.com/1/webhooks/?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`, {
    description: "Realtime Sync Webhook",
    callbackURL,
    idModel: modelId
  });
  res.json(response.data);
});

// ✅ Handles Trello validation + webhook events
app.all('/trello-webhook', (req, res) => {
  console.log('=== Trello Webhook Hit ===');
  console.log('Method:', req.method);
  console.log('Headers:', JSON.stringify(req.headers));
  console.log('Body Preview:', JSON.stringify(req.body).slice(0, 300));
  
  // Trello expects a 200 OK no matter what
  res.status(200).send('OK');
});

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));

