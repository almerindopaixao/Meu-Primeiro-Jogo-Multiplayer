const path = require('path')

exports.paginaInicial = (req, res) => {
    res.render('cliente.html')
}

exports.trataPost = (req, res) => {
    res.send(req.body)
    return
}