const WebSocket = require('ws')
const http = require('http')
const server = http.createServer()
const wss = new WebSocket.Server({ server })

let players = []
let nextId = 1
const questions = [] // add sample question

wss.on('connection', (ws) => {
  let playerId = nextId++
  console.log('Player connected')
  players.push({user: ws, id: playerId})

  // Handle messages from players
  ws.on('message', (message) => {
    console.log(`Received message: ${message}, ${playerId}`)
    // Handle player responses and game logic
  })

  ws.on('close', () => {
    console.log('Player disconnected')
    // Handle player disconnection
    players = players.filter(player => player !== ws)
  })
})

// Broadcast a question to all connected players
function sendQuestion(question) {
  players.forEach(player => player.send(question))
}

// Start the server
server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
