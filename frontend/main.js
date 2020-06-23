import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './css/style.css'

const screen = document.getElementById('screen');
const context = screen.getContext('2d');
const currentPlayerId = 'player1'

const game = {
    players: {
        'player1': { x: 1, y: 1 },
        'player2': { x: 9, y: 9 }
    },
    fruits: {
        'fruit1': {x: 3, y: 1}
    }
}

document.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
    const keypress = event.key;
    const player = game.players[currentPlayerId];

    if (keypress == 'ArrowUp' && player.y - 1 >= 0) {
        player.y -= 1
        console.log('Up')
    }

    if (keypress == 'ArrowDown' && player.y + 1 < screen.height) {
        player.y += 1
        console.log('Down')
    }

    if (keypress == 'ArrowRight' && player.x + 1 < screen.width) {
        player.x +=1
        console.log('Right')
    }

    if (keypress == 'ArrowLeft' && player.x - 1 >= 0) {
        player.x -= 1
        console.log('Left')
    }
}

renderScreen();

function renderScreen() {
    context.fillStyle = 'white';
    context.clearRect(0, 0, 10, 10)

    for (let playerId in game.players) {
        const player = game.players[playerId];
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (let fruitId in game.fruits) {
        const fruit = game.fruits[fruitId];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    // Função que serve para otmizar o jogo
    requestAnimationFrame(renderScreen);
}