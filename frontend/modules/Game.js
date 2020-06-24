export default function () {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    const acceptedMoves = {
        ArrowUp(player) {
            if (player.y - 1 >= 0) player.y = player.y - 1
        },

        ArrowRight(player) {
            if (player.x + 1 < state.screen.width) player.x = player.x + 1
        },

        ArrowDown(player) {
            if (player.y + 1 < state.screen.height) player.y = player.y + 1
        },

        ArrowLeft(player) {
            if (player.x - 1 >= 0) player.x = player.x - 1
        },
    }

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;

        state.players[playerId] = {
            x: playerX,
            y: playerY
        }
    }

    function removePLayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]
    }

    function addFruit(command) {
        const fruitId = command.fruitId;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    function movePlayer(command) {

        const keyPressed = command.keyPressed;
        const playerId = command.playerId;
        const player = state.players[command.playerId];
        const movefunction = acceptedMoves[keyPressed];

        if (player && movefunction) {
            movefunction(player)
            checkForFruitCollision(playerId)
        }

    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId];

        for (let fruitId in state.fruits) {
            const fruit = state.fruits[fruitId];
            console.log(`Checking ${playerId} and ${fruitId}`)

            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`COLLISION between ${playerId} and ${fruitId}`)
                removeFruit({ fruitId: fruitId })
            }
        }

    }

    return {
        movePlayer,
        removePLayer,
        addPlayer,
        removeFruit,
        addFruit,
        state
    }
}