/*
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
//game.start()

game.subscribe( command => {
    console.log(`> Emitting ${command.type}`)
    sockets.emit(command.type, command)
})

sockets.on('connection', socket => {
    const playerId = socket.id;
    console.log(`> Player connected: ${playerId}`)

    game.addPlayer({ playerId: playerId})

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePLayer({playerId: playerId})
        console.log(`> Player Disconnect: ${playerId}`)
    })

    socket.on('move-player', command => {
        command.playerId = playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })
})
*/

import server from './app';

server.listen(3333, () => {
    console.log('> Server listerning on port: 3333')
});