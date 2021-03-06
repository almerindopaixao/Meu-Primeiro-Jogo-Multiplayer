export function setupScreen(canvas, game) {
    const { screen: { width, height } } = game.state;
    canvas.width = width;
    canvas.height = height;
}

export default function renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId) {
    const context = screen.getContext('2d');
    context.fillStyle = 'white';
    const { screen: { width, height } } = game.state;
    context.clearRect(0, 0, width, height);

    for (let playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1);
    }

    for (let fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    const currentPlayer = game.state.players[currentPlayerId]

    if(currentPlayer) {
        context.fillStyle = 'blue';
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1);
    }

    updateScoreTable(scoreTable, game, currentPlayerId);

    requestAnimationFrame(() => {
        renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId)
    })
}

function updateScoreTable(scoreTable, game, currentPlayerId) {
    const maxResults = 10

    let scoreTableInnerHTML = `
        <tr class="header">
            <th>Top 10 jogadores</td>
            <th>Pontos</td>
        <tr>
    `

    const playersArray = [];

    for (let socketId in game.state.players) {
        const player = game.state.players[socketId];
        playersArray.push({
            playerId: socketId,
            name: player.name,
            x: player.x,
            y: player.y,
            score: player.score,
        });
    }

    const playersSortedByScore = playersArray.sort((first, second) => {
        if (first.score < second.score) {
            return 1;
        }

        if (first.score > second.score) {
            return -1;
        }

        return 0
    });

    const topScorePlayers = playersSortedByScore.slice(0, maxResults);

    scoreTableInnerHTML = topScorePlayers.reduce((stringFormed, player) => {
        return stringFormed + `
            <tr ${player.playerId == currentPlayerId ? 'class="current-Player"' : ''}>
                <td>${player.name}</td>
                <td>${player.score}</td>
            </tr>
        `
    }, scoreTableInnerHTML);

    const currentPlayerFromTopScore = topScorePlayers[currentPlayerId];

    if (currentPlayerFromTopScore) {
        scoreTableInnerHTML += `
            <tr class="current-player bottom">
                <td>${currentPlayerFromTopScore.playerId} EU </td>
                <td>${currentPlayerFromTopScore.score}</td>
            </tr>
        `
    }

    scoreTable.innerHTML = scoreTableInnerHTML;

}