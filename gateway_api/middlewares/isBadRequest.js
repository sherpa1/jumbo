const isBadRequest = (req, res, next) => {
    if (req.query) {
        for (const key in req.query) {
            if (req.query[key] === "") {
                return next(400);
            }
        }
    }

    next();
}

module.exports = isBadRequest;