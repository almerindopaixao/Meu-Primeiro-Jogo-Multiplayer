const express = require('express');
const http = require('http');
const routes = require('./routes');
const path = require('path');

const app = express();
const server = http.createServer(app)

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static((path.resolve(__dirname, 'public'))));

app.use(routes);

app.listen(3333, () => {
    console.log('> Server listerning on port: 3333')
});