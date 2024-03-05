const http = require('http');
const { Server } = require('socket.io');

const seedData = require('./seedData.json');

const randomizedMessageBack = function (buddyUserName) {
  const buddyMessages = seedData.buddyList[buddyUserName].messages;
  const randomizedIndex = Math.floor(Math.random() * buddyMessages.length) + 0;
  return buddyMessages[randomizedIndex]
}

const httpServer = http.createServer((req, res) => {
  res.write('Server running!');
  res.end();
});

const io = new Server(httpServer, {
  // During development, you need to enable CORS on your server
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('message', (message) => {
    console.log('message is: ', message);
    io.emit('message', message); // Broadcast the message to all connected clients
    // randomize message back...
    const { currentBuddy } = message;
    let randomMessage = randomizedMessageBack(currentBuddy);
    io.emit('message', { user: currentBuddy, message: randomMessage });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

httpServer.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});
