const socket = io('http://localhost:8000', { transports : ['websocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const nameHeading = document.querySelector('.heading-primary')
var audio = new Audio('chat.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
    audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const names = prompt("Enter your name to join");
socket.emit('new-user-joined', names);

const nameHeadingElement = document.createElement('div');
nameHeadingElement.innerText = names;
nameHeading.append(nameHeadingElement);

socket.on('user-joined', names=>{
    append(`${names} joined the chat`, 'right')
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', names=>{
    append(`${names} left the chat`, 'right')
})