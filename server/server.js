const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
      }
  }
);

let females = [];
let males = [];

io.on('connection', (socket) => {
  console.log('user connected')
  
  socket.on('newStranger', (data) => {
    let stranger = {
      name : data.name,
      sex : data.sex,
      id : socket.id
    }

    if (stranger.sex === "female") {
      females.push(stranger)
    }
    else{
      males.push(stranger)
    }
    console.log("females: ", females, "males: ", males)
  })
  socket.on('disconnect', (socket) => {
    console.log('user disconnected')
  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});