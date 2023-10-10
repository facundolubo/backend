
//esta linea de import me rompía todo
//import Swal from "sweetalert2"

//window.alert('Estoy leyendo el script')

/*
Swal.fire({
  title: 'Authentication',
  input: 'text',
  text: 'Set a username for the chat',
  inputValidator: value => {
      return !value.trim() && 'Please, write a valid username'
  },
  allowOutsideClick: false
}).then(result => {
  let user = result.value
  document.getElementById('username').innerHTML = user
  let socket = io()

  let chatbox = document.getElementById('chatbox')
  chatbox.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
          if (chatbox.value.trim().length > 0) {
              socket.emit('message', {
                  user,
                  message: chatbox.value
              })
              chatbox.value = ""
          }
      }
  })

  socket.on('logs', data => {
      const divLogs = document.getElementById('log')
      let messages = ''
      data.reverse().forEach(message => {
          messages += `<p><i>${message.user}</i>: ${message.message}</p>`
      })
      divLogs.innerHTML = messages
  })
})
*/

const socketClient = io()
let chatBox = document.getElementById('chatBox')

chatBox.addEventListener('keyup', (evt) => {
    if (evt.key === "Enter") {
        socketClient.emit('message', chatBox.value)
    }
})

socketClient.on('history', data => {
    let history = document.getElementById('history')
    let messages = ""
    data.forEach(message => {
        // messages += `${message}<br>`
        messages += `${message.userId} dice: ${message.message}<br>`
    })
    history.innerHTML = messages
    chatBox.value = ""
})