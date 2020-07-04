const checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.render('404');
    }

    next()
}

const csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next()
}

export { checkCsrfError, csrfMiddleware };

