
// backend/index.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000' } //allowing my react app from front end
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const TRELLO_KEY = process.env.TRELLO_KEY;
const TRELLO_TOKEN = process.env.TRELLO_TOKEN;

// Simple homepage to prove server is up
app.get('/', (req, res) => res.send('Backend running'));

// Trello webhook callback endpoint
// Trello will POST event payloads here.
app.head('/trello/webhook', (req, res) => {
  // Trello does HEAD requests to validate callback URLs — respond 200
  res.sendStatus(200);
});

app.post('/trello/webhook', (req, res) => {
  // Trello sends JSON describing action and model
  const payload = req.body;
  console.log('Trello webhook received:', JSON.stringify(payload).slice(0, 800));
  // Broadcast to connected frontends via Socket.IO
  io.emit('trello-event', payload);
  // Acknowledge quickly
  res.sendStatus(200);
});

// Optional: endpoint to register webhook from server 
app.post('/register-webhook', async (req, res) => {
  try {
    const { idModel, callbackURL } = req.body; // idModel = board id or card id
    const url = `https://api.trello.com/1/webhooks/?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`;
    const data = { description: 'Realtime Hook', callbackURL, idModel };
    const response = await axios.post(url, data);
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to register webhook', details: err.response?.data || err.message });
  }
});

io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
