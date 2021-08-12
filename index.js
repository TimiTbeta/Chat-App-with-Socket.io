const express = require('express');
const socket = require('socket.io');
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server: http://localhost:${port}`));
const io = socket(server);

let activeUsers = new Set();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.post('/data', (req,res) => {
  console.log(req.body);
})

io.on('connection', socket => {
  let room_id = "";
  console.log("Made socket connected");

  socket.on('join', ({ username, room }) => {
  console.log(`${username}, ${room}`);
  if(!username || !room){
    throw new Error("Username or Room is nothing !!");
  }

  room_id = room;
  socket.userId = username;
  activeUsers,add(username);
  socket.join(room)
  })

  socket.emit('enter_users', activeUsers[room_id]);
  
});