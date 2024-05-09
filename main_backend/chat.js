const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: "http://localhost:3000"  // Permite solicitudes solo desde este origen
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",  // Permite solicitudes WebSocket desde este origen
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
    console.log('Client connected');
    console.log(socket.id);

    // Escuchar cuando un usuario se une a una sala específica
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on('message', (data) => {
        console.log(data);
        // Asegurarse de que el mensaje se envía solo a usuarios en la misma sala
        io.to(data.roomId).emit('message', {
            messageBody: data.messageBody,
            from: socket.id.slice(6),
            roomId: data.roomId
        });
    });

    // Escuchar cuando un usuario sale de una sala
    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
        console.log(`Socket ${socket.id} left room ${roomId}`);
    });
});


server.listen(4040);
console.log('Server on port', 4040);
