const express = require('express');
const app = express();

const routes = require('./routes');
const path = require('path');

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static((path.resolve(__dirname, 'public'))));

app.use(routes);

app.listen(3333, () => {
    console.log('Servidor executando na porta 3333')
});