const express = require('express');
const socketIO = require('socket.io')
var path = require('path')

const PORT = process.env.PORT || 3000;
const INDEX = '../client/index.html';
console.log('index.html', { root: path.join(__dirname, '../client') });

const server = express()
  .use(express.static(path.join(__dirname, '../client')))
  // .use((req, res) => res.sendFile('index.html', { root: path.join(__dirname, '../client')}))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server)

io.set('heartbeat timeout', 3000);
io.set('heartbeat interval', 3000);


io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('temp', (data) => {
    console.log(' Temp : ', data)
    io.emit('temp', data)
  })

  socket.on('disconnect', () => console.log('Client disconnected'))
});