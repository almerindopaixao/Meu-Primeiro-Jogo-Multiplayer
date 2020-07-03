class HomeController {
    index(req, res) {
        try {
            res.render('cliente');
        } catch (e) {
            res.send('Arquivo não encontrado')
        }
    }
}

export default new HomeController();