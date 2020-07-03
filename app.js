import express from 'express';
import { resolve } from 'path';
import socketio from 'socket.io';
import { createServer } from 'http';

import homeRoutes from './src/routes/homeRoutes';
import createGame from './frontend/modules/Game';

class App {
    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.middlewares();
        this.routes();
        this.sockets = socketio(this.server);
        this.game = createGame();

        this.connection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(express.static(resolve(__dirname, 'public')));
        this.app.set('views', resolve(__dirname, 'src', 'views'));
        this.app.set('view engine', 'ejs');
    }

    routes() {
        this.app.use('/', homeRoutes);
    }

    connection() {
        this.game.subscribe(command => {
            // console.log(`> Emitting ${command.type}`);
            this.sockets.emit(command.type, command);
        })

        // this.game.start()

        this.sockets.on('connection', socket => {
            const playerId = socket.id;
            console.log(`> Player connected: ${playerId}`);

            this.game.addPlayer({ playerId: playerId });

            socket.emit('setup', this.game.state);

            socket.on('disconnect', () => {
                this.game.removePLayer({ playerId: playerId });
                console.log(`> Player Disconnect: ${playerId}`);
            });

            socket.on('move-player', command => {
                command.playerId = playerId;
                command.type = 'move-player';

                this.game.movePlayer(command)
            });
        });
    }
}

export default new App().server;