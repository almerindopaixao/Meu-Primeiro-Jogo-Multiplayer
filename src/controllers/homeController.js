const path = require('path')

exports.paginaInicial = (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'views', 'cliente.html'))
    return
}

exports.trataPost = (req, res) => {
    res.send(req.body)
    return
}