import io from 'socket.io-client';
import { useState, useEffect } from 'react';

const socket = io("http://localhost:4040"); // conectar al backend, para recibir informacion de respuesta

function App() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]); //Arreglo de mensajes



  const handleSubmit = (event) => {
    event.preventDefault();
    
    socket.emit('message', {
      messageBody: message,
      roomId: 1,
      from: 'Me'
    });
    
  };

  useEffect(() => {
    socket.emit('joinRoom', 1);
    socket.on('message', reciveMessage);

    return () => {
      socket.off('message', reciveMessage);
    };
  }, []);

  const reciveMessage = (message) =>
    setMessages(state => [...state, message]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text" 
          placeholder='Escribe el mensaje ;)'
          onChange={(e) => setMessage(e.target.value)}
        />

        <ul>
        {
          messages.map((message, i) => (
            <li key={i}>
              <span>{message.from}</span>  {message.messageBody}
            </li>
          ))
        }
      </ul>

      </form>
    </div>
  )
}

export default App