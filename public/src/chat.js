const socket = io();

const activePeople = document.querySelector('.activeuser');
const inputMessage = document.querySelector('.message-input');
const sendButton = document.querySelector('.message-button');
const messageList = document.querySelector('.message-list');



socket.emit('new user', "Hello World");
socket.on('entry_user', data => {
  
})
socket.on('reply', data => console.log(data));
