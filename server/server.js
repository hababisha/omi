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


let rooms = [];
let females = [];
let males = [];

io.on('connection', (socket) => {
  // console.log('user connected:', socket.id)
  
  socket.on('newStranger', (data) => {
    const { name, sex} = data;

    let stranger = { 
      name,
      sex,
      id: socket.id
    }

    const matchAndJoin = (partner, current) => {
      const room = `room-${partner.id}-${current.id}`
      socket.join(room)
      io.to(partner.id).socketsJoin(room)

      io.to(current.id).emit('match', {room})
      io.to(partner.id).emit('match', {room})
    }

    if (sex === "male"){
      if (females.length>0) {
        const partner = females.shift()
        matchAndJoin(partner,stranger)
      } else{
        males.push(stranger)
      }
    }else if(sex === "female"){
      if (males.length >0) {
        const partner = males.shift()
        matchAndJoin(partner,stranger)

      }else{
        females.push(stranger)
      }
    }

    // socket.join(room)
    // console.log(name, "joined room: ", room, " as sex ", sex)
    
    // console.log("females: ", females, "males: ", males)

    socket.on("chat", ({room, message, from}) => {
      // console.log('message from room:', room, 'message:', message)

      socket.to(room).emit('receive-chat', {from, text: message})
    })  
    
    socket.on('disconnect', (socket) => {
      // console.log('user disconnected')
      males = males.filter((user)=> user.id !== socket.id)
      females = females.filter((user) => user.id !== socket.id)
      console.log('user disconnected')
    })

  })
})

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});