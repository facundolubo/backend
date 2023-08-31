const socket = io()
console.log('Socket establecido' + socket)

let chatBox = document.getElementById('chatBox')

chatBox.addEventListener('keyup', (evt) => {
  if (evt.key === 'Enter') {
    socket.emit('message', chatBox.value)
  }
})

socketClient.on('history', (data) => { chatBox.value = data })