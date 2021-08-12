const socket = io();

const form = document.querySelector('form');
const username = document.querySelector('.username-input');
const room = document.querySelector('.room-input');

form.addEventListener('submit', e => {
  const data = { username: username.value, room: room.value };

  socket.emit('join', data);
  username.value = "";
  room.value = "";
});


