const socket = new WebSocket('ws://localhost:3000')

socket.addEventListener('open', (event) => {
  console.log('Connected to the server')
})

socket.addEventListener('message', (event) => {
  const question = JSON.parse(event.data)
  console.log(`Received question: ${question.text}`)
})

socket.addEventListener('close', (event) => {
  console.log('Connection closed')
})

function sendResponse(response) {
  socket.onopen = () => {
    socket.send(response)
  }
}

sendResponse('Option A')


