//frontend  src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import MessageList from './components/MessageList';

import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  transports: ['websocket'], // Use websocket transport
  cors: {
    origin: 'http://localhost:3000', // Replace with the origin of your frontend
    methods: ['GET', 'POST'],
  },
});


function App() {
  const [messages, setMessages] = useState([]);
  const [successRate, setSuccessRate] = useState(0);

 
  useEffect(() => {

  // Add your WebSocket event listeners here
  socket.on('message', (data) => {
    // Handle incoming messages from the server
    console.log('Received message:', data);
  });

  fetch('http://localhost:3001/messages') // Replace with your backend URL
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Fetched data:', data);
    setMessages(data);
  })
  .catch((error) => {
    console.error('Fetch error:', error);
  });

        // Clean up the event listener when the component unmounts
    return () => {
      socket.off('message');
    };
  }, []);
  

  return (
    <div className="App">
      <h1>Message List</h1>
      <div>Success Rate: {successRate}%</div>
      <ul>
  {messages.map((message, index) => (
    <li key={index}>
      Name: {message.name}, Origin: {message.origin}, Destination: {message.destination}
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;
