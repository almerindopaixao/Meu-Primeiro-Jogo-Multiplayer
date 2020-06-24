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
keyBoardListener.subscribe(game.movePlayer)

const screen = document.getElementById('screen');
renderScreen(screen, game, requestAnimationFrame)

socket.on('connect', () => {
    const playerId = socket.id;
    console.log(`> Player connected on Cliente with id: ${playerId}`)
})

socket.on('setup', state => {
    console.log('> Receiving "setup" event from server')
    console.log(state)

    game.state = state;
})
