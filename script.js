const socket = new WebSocket('ws://localhost:3000')
const chatInput = document.querySelector(".chat-input")
const questionText = document.querySelector(".question")

socket.addEventListener('open', (event) => {
  console.log('Connected to the server', event)
})

socket.addEventListener('message', (event) => {
  const question = JSON.parse(event.data)
  questionText.textContent = question.question
})

socket.addEventListener('close', (event) => {
  console.log('Connection closed')
})

function sendResponse(response) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(response);
  } else {
    console.error('WebSocket connection is not open');
  }
}

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.target.value) {
    sendResponse(e.target.value)
    chatInput.value = ""
  }
})

