export default function (document) {
    const state = {
        observers: [],
        playerId: null
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    function unRegisterPlayerId() {
        state.playerId = null
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function underSubscribe() {
        state.observers = []
    }

    function notifyAll(command) {
        for (let observerFunction of state.observers) {
            observerFunction(command)
        }
    }

    document.addEventListener('keydown', handleKeydown);

    function handleKeydown(event) {
        const keyPressed = event.key;

        const command = {
            type: 'move-player',
            playerId: state.playerId,
            keyPressed
        }

        notifyAll(command)
    }

    return {
        subscribe,
        registerPlayerId,
        unRegisterPlayerId,
        underSubscribe
    }

}