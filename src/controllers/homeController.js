let player;

class HomeController {
    index(req, res) {
        res.render('cadastro')
    }

    store(req, res) {
        res.render('cliente');
        player = req.body.player;
    }
}

export { player };
export default new HomeController();
