const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

io.on('connection', (socket) => {
    console.log('A user connected');
});

server.listen(port, () => {
   console.log(`Server is running on port: ${port}`);
});

