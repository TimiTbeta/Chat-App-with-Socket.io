const express = require('express');
const socket = require('socket.io');
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server: http://localhost:${port}`));
const io = socket(server);
let roomUsers = new Set();
let user = "";
let roomId = "";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



app.post('/data', (req,res) => {
  console.log(req.body);
})

io.on('connection', socket => {
  
  
  console.log("Made socket connected");
  
  socket.on('enter', ({ username, room  }) => {
    console.log(`${username}, ${room}`);
    user = username;
    roomId = room;
    console.log("success");
  });

  socket.on('join', () => {
    socket.join(roomId);
    roomUsers.add(user);
    socket.emit('room', roomId);
  });


  io.to(roomId).emit('users-in-room', [...roomUsers]);

  socket.on('sendMessage', Message => {
    io.to(roomId).emit('toAll', Message);
  });
  socket.emit('entering_users', roomUsers);
  
});