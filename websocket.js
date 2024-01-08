const WebSocket = require('ws')
const http = require('http')
const server = http.createServer()
const wss = new WebSocket.Server({ server })

let players = []
let nextId = 1
let currentQuestion = 0
const questions = [
  {
    question: " What is the largest desert in the world?",
    answer:"Antarctica"
  },
  {
    question: "What is the name of the fictional wizarding school in the Harry Potter series?",
    answer:"Hogwarts"
  },
  {
    question: "What is the chemical symbol for water?",
    answer:"H2O"
  },
  {
    question: "In soccer, what part of the body can players not use to touch the ball?",
    answer:"Hands"
  },
  {
    question: "Who was the first President of the United States?",
    answer:"Washington"
  },
]

wss.on('connection', (ws) => {
  let playerId = nextId++
  console.log('Player connected')
  players.push({user: ws, id: playerId})
  console.log("Total Players:", players.length)


  if (players.length > 1) {
    broadCastAllPlayers()
    broadcastQuestion(questions[currentQuestion])
  } 

  // Handle messages from players
  ws.on('message', (message) => {
    if(message == questions[currentQuestion].answer) {
      // Return to question 1 if all question already answered
      if(currentQuestion == questions.length - 1) {
        currentQuestion = 0
      } else {
        currentQuestion++
      }
      broadcastQuestion(questions[currentQuestion])
      console.log(`Correct Answer: ${message}, Player ID: ${playerId}`)
      // Increment player points
    }
   
    console.log(`Received message: ${message}, ${playerId}`)
  })

  ws.on('close', () => {
    console.log('Player disconnected')
    // Handle player disconnection
    players = players.filter(player => player.user !== ws)
    broadCastAllPlayers()
  })
})

// Broadcast a message to all connected players
function broadCastAllPlayers() {
  console.log("Total Players:", players.length)
  const playersList = JSON.stringify({ players: players.map(player => ({ id: player.id }))})
  players.forEach((player) => player.user.send(playersList))
}

// Broadcast a question to all connected players
function broadcastQuestion(question) {
  players.forEach((player) => sendQuestion(question, player.user))
}

// Send a question to a specific player
function sendQuestion(question, player) {
  player.send(JSON.stringify(question))
}

// Start the server
server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})
