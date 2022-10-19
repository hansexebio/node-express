const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const port = 3000
const io = new Server(server, {  cors: {  origin: "*",    methods: ["GET", "POST"]  }});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('nueva conexion')
  socket.broadcast.emit('chat message', 'Usuario Nuevo!! Dale la bienvenida a ' + socket.id.toString());
  const id_handshake = socket.id;
  console.log(id_handshake);
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('usuario desconectado');
  });
});

server.listen(3000, () => {
  console.log('listening on *:' + port.toString());
});