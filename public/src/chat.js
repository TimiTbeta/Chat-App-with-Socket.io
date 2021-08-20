const socket = io();

const usersList = document.querySelector('.user-list');
const sendButton = document.querySelector('.message-button');
const messageList = document.querySelector('.message-list');
const roomName  = document.querySelector('.room');
function joinRoom() {
  socket.emit('join');
};

joinRoom();

socket.on('room', room_id => {
  roomName.innerText = room_id;
  console.log("success");
});

socket.on('users-in-room', users => {
  users.forEach(user => {
    const user_item = document.createElement('li');
    user_item.textContent = user;
    usersList.appendChild(user_item);
  });
});


socket.on('toAll', Message => {
  const p = document.createElement('p');
  p.textContent = Message;
  messageList.appendChild(p);
})

sendButton.addEventListener("click", e => {
  e.preventDefault();
  const inputMessage = document.querySelector('.message-input');
  const sendMessage = inputMessage.value;
  socket.emit('sendMessage', sendMessage);
  inputMessage.textContent = "";
});



socket.on('reply', data => console.log(data));
