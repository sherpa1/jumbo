const hidePassword = (req, res, next) => {

    if (res.body.password) {
        res.body.password = '*****';
    }
    next();
}

module.exports = hidePassword;