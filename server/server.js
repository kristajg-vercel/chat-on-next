const http = require('http');
const { Server } = require('socket.io');

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
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

httpServer.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});
