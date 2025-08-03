const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
      }
  }
);

let females = [];
let males = [];

io.on('connection', (socket) => {
  console.log('user connected:', socket.id)
  
  socket.on('newStranger', (data) => {
    const {room, name, sex} = data;
    let stranger = {
      room,
      name,
      sex,
      id: socket.id
    }
    socket.join(room)
    console.log(name, "joined room: ", room, " as sex ", sex)

    if (sex == "female"){
      females.push(stranger)
    }
    else{
      males.push(stranger)
    }
    console.log("females: ", females, "males: ", males)

    socket.on("chat", ({room, message, from}) => {
      console.log('message from room:', room, 'message:', message)

      socket.to(room).emit('receive-chat', {from, text: message})
    })
    socket.on('disconnect', (socket) => {
      console.log('user disconnected')
    })

  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});