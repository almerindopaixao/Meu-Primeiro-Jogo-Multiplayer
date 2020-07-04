let player;

class HomeController {
    index(req, res) {
        return res.render('cadastro')
    }

    store(req, res) {
        player = req.body.player;
        return res.render('cliente');
        
    }
}

export { player };
export default new HomeController();
