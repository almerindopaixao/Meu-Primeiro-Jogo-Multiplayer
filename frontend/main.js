import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './css/style.css';
import createGame from './modules/Game';
import createKeyboardListener from './modules/KeyboardListener';
import renderScreen from './modules/renderScreen';

const io = require('socket.io-client');
const socket = io()

const game = createGame();
const keyBoardListener = createKeyboardListener(document);

socket.on('connect', () => {
    const playerId = socket.id;
    console.log(`> Player connected on Cliente with id: ${playerId}`)

    const screen = document.getElementById('screen');
    renderScreen(screen, game, requestAnimationFrame, playerId)
})

socket.on('disconnect', () => {
    console.log(`Player disconnected`)

    keyBoardListener.unRegisterPlayerId()
    keyBoardListener.underSubscribe()

})

socket.on('setup', state => {
    const playerId = socket.id
    game.setState(state)

    keyBoardListener.registerPlayerId(playerId)
    keyBoardListener.subscribe(game.movePlayer)
    keyBoardListener.subscribe(command => {
        socket.emit('move-player', command)
    })
})

socket.on('add-player', command => {
    console.log(`Receiving ${command.type} => ${command.playerId}`)
    game.addPlayer(command)
})

socket.on('remove-player', command => {
    console.log(`Receiving ${command.type} => ${command.playerId}`)
    game.removePLayer(command)
})

socket.on('move-player', command => {
    console.log(`Receiving ${command.type} => ${command.playerId}`)

    const playerId = socket.id

    if (playerId !== command.playerId) {
        game.movePlayer(command)
    }
})

socket.on('add-fruit', command => {
    console.log(`Receiving ${command.type} => ${command.fruitId} `)
    game.addFruit(command)
})

socket.on('remove-fruit', command => {
    console.log(`Receiving ${command.type} => ${command.fruitId} `)
    game.removeFruit(command)
})
