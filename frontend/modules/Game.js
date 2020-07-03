export default function() {
    // Essa função retorna positivo para números negativos
    const mod = (x, y) => ((y % x) + x) % x;

    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10,
        }
    }

    const acceptedMoves = {
        ArrowUp(player) {
            player.y = mod(state.screen.height, player.y - 1);
        },

        ArrowRight(player) {
            player.x = mod(state.screen.width, player.x + 1);
        },

        ArrowDown(player) {
            player.y = mod(state.screen.height, player.y + 1);
        },

        ArrowLeft(player) {
            player.x = mod(state.screen.width, player.x - 1);
        },
    }

    const observers = [];

    function start() {
        const frequency = 4000;

        setInterval(addFruit, frequency);
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction)
    }

    function notifyAll(command) {
        for (let observerFunction of observers) {
            observerFunction(command)
        }
    }

    function setState(newState) {
        Object.assign(state, newState)
    }

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width);
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height);
        const score = 0

        state.players[playerId] = {
            x: playerX,
            y: playerY,
            score,
        }

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY,
            score
        })
    }

    function removePLayer(command) {
        const playerId = command.playerId

        delete state.players[playerId]

        notifyAll({
            type: 'remove-player',
            playerId: playerId,
            
        })
    }

    function addFruit(command) {
        const fruitId = command ? command.fruitId: Math.floor(Math.random() * 100000000)
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width);
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height);

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY,
        }

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY,
        })
    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]

        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId,
        })
    }

    function movePlayer(command) {
        notifyAll(command)

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
            // console.log(`Checking ${playerId} and ${fruitId}`)

            if (player.x === fruit.x && player.y === fruit.y) {
                // console.log(`COLLISION between ${playerId} and ${fruitId}`)
                removeFruit({ fruitId: fruitId })
                player.score += 1
            }
        }

    }

    return {
        movePlayer,
        removePLayer,
        addPlayer,
        removeFruit,
        addFruit,
        state,
        setState,
        subscribe,
        start
    }
}