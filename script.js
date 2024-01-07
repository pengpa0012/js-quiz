const socket = new WebSocket('ws://localhost:3000')
const chatInput = document.querySelector(".chat-input")
const questionText = document.querySelector(".question")
const playerLists = document.querySelector(".player-lists")

questionText.textContent = "Loading..."

socket.addEventListener('open', (event) => {
  console.log('Connected to the server', event)
})

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data)
  questionText.textContent = data.question

  if(data.players !== undefined && data.players.length !== playerLists.children.length) {
    playerLists.innerHTML = ""
    for(let i = 0; i < data.players?.length; i++) {
      const playerTemplate = `<div class="p-4 border rounded-md min-w-[150px] text-center">
        <h2 class="text-2xl">Player ${data.players[i].id}</h2>
      </div>
      `
      playerLists.innerHTML += playerTemplate
    }
  }
})

socket.addEventListener('close', (event) => {
  console.log('Connection closed')
})

function sendResponse(response) {
  if (socket.readyState === WebSocket.OPEN) {
    // Send response along with player id
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

