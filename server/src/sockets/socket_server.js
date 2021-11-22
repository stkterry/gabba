const http = require('http');
const socketIo = require('socket.io');

const Message = require('../models/Message');

const origin = (() => {
  switch(process.env.NODE_ENV) {
    case "development": return "http://localhost:3000";

    case "staging": return `http://localhost:${process.env.PORT || 5001}`;

    case "production": return process.env.ORIGIN;

    default: return "http://localhost:3000";
  }
})();


const socketServer = app => {

  const server = http.createServer(app);
  const io = socketIo(server, {
    cors: {
      origin,
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', socket => {
    console.log('Client connected');

    socket.on('join', room => {
      socket.join(room);
      console.log(`Connected client to room: ${room}`);
    })

    socket.on('leave', room => {
      socket.leave(room);
      socket.to(room).emit(`Client left room: ${room}`, socket.id)
    })

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('sendMessage', ({message, room}, cb) => {
      Message.addNew(message, room)
        .then(newMessage => {
          if (newMessage) io.to(room).emit('receiveMessage', { room, message: newMessage })
          else socket.to(room).emit('messageFailed', { handle: null, content: 'Failed to save'})
        })  
      cb('received');
    });

  })

  return server;
}

module.exports = socketServer;