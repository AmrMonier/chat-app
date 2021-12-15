var socket = io();
const chatForm = document.querySelector('#send-message')
console.log(chatForm);
chatForm.addEventListener('submit',(e) => {
  e.preventDefault()
  let msg = document.querySelector('#msg-input')

  socket.emit('message', msg.value)
  msg.value = null
})

socket.on('message',  (msg) => {
  console.log(msg);
})


