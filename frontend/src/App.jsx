import React, { useEffect, useState } from 'react';

//This tells that React app running at port 3000 to connect to my backend at port 5000.
import { io } from 'socket.io-client';

// Connect to backend — during local dev use localhost:5000
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
const socket = io(SOCKET_URL, { transports: ['websocket', 'polling'] });

export default function App() {
  const [events, setEvents] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server');
      setConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setConnected(false);
    });

    socket.on('trello-event', (payload) => {
      console.log('Trello event received:', payload);
      setEvents((prev) => [payload, ...prev].slice(0, 50));
    });

    return () => {
      socket.off('trello-event');
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Trello Realtime Updates</h1>
      <p>Socket Connected: {connected ? '✅' : '❌'}</p>
      <h2>Recent Events</h2>
      {events.length === 0 ? (
        <p>No events received yet...</p>
      ) : (
        <ul>
          {events.map((e, i) => (
            <li key={i}>
              <pre>{JSON.stringify(e, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
