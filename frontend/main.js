import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './css/style.css';
import createGame from './modules/Game';
import createKeyboardListener from './modules/KeyboardListener';
import renderScreen from './modules/renderScreen';

const game = createGame();
const keyBoardListener = createKeyboardListener(document);
keyBoardListener.subscribe(game.movePlayer)

const screen = document.getElementById('screen');
renderScreen(screen, game, requestAnimationFrame)

game.addPlayer({playerId: 'player1', playerX: 0, playerY: 0})
game.addPlayer({playerId: 'player2', playerX: 7, playerY: 0})
game.addPlayer({playerId: 'player3', playerX: 9, playerY: 0})
game.addFruit({fruitId: 'fruta1', fruitX: 3, fruitY: 3})
game.addFruit({fruitId: 'fruta2', fruitX: 3, fruitY: 5})
