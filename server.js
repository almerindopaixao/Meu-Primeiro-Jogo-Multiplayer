const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const routes = require('./routes');
const path = require('path');
const createGame = require('./src/controllers/gameController');

const app = express();
const server = http.createServer(app);
const sockets = socketio(server)

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static((path.resolve(__dirname, 'public'))));

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(routes);

const game = createGame();

game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0})
game.addPlayer({playerId: 'player2', playerX: 7, playerY: 0})
game.addPlayer({playerId: 'player3', playerX: 9, playerY: 0})
game.addFruit({fruitId: 'fruta1', fruitX: 3, fruitY: 3})
game.addFruit({fruitId: 'fruta2', fruitX: 3, fruitY: 5})

console.log(game.state)

sockets.on('connection', socket => {
    const playerId = socket.id;
    console.log(`> Player connected on Server with id: ${playerId}`)

    socket.emit('setup', game.state)
})


server.listen(3333, () => {
    console.log('> Server listerning on port: 3333')
});