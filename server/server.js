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
});

let females = [];
let males = [];

io.on('connection', (socket) => {
  socket.on('newStranger', (data) => {
    const { name, sex } = data;
    const stranger = { id: socket.id, name, sex };

    const matchAndJoin = (partner, current) => {
      const room = `room-${partner.id}-${current.id}`;

      // join both sockets to the same room
      socket.join(room);
      io.to(partner.id).socketsJoin(room);

      io.to(current.id).emit('match', {
        room,
        localName: current.name,
        remoteName: partner.name,
        initiator: false
      });

      io.to(partner.id).emit('match', {
        room,
        localName: partner.name,
        remoteName: current.name,
        initiator: true
      });
    };

    if (sex === 'male') {
      if (females.length > 0) {
        const partner = females.shift();
        matchAndJoin(partner, stranger);
      } else {
        males.push(stranger);
      }
    } else if (sex === 'female') {
      if (males.length > 0) {
        const partner = males.shift();
        matchAndJoin(partner, stranger);
      } else {
        females.push(stranger);
      }
    }

    // chat 
    socket.on('chat', ({ room, message, from }) => {
      socket.to(room).emit('receive-chat', { from, text: message });
    });

    // signaling 
    socket.on('offer', ({ room, offer }) => {
      socket.to(room).emit('offer', { offer });
    });

    socket.on('answer', ({ room, answer }) => {
      socket.to(room).emit('answer', { answer });
    });

    socket.on('ice', ({ room, candidate }) => {
      socket.to(room).emit('ice', { candidate });
    });

    socket.on('disconnect', () => {
      males = males.filter(u => u.id !== socket.id);
      females = females.filter(u => u.id !== socket.id);
      console.log('user disconnected', socket.id);
    });
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
