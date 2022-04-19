const jwt = require('jsonwebtoken');

const auth_url = process.env.AUTH_URL;

module.exports = async (req, res, next) => {



    const token = req.headers.authorization.split(' ')[1];//Bearer Authorization

    if (token === undefined) {
        next(401);
    } else {

        const jwt_private_key = process.env.JWT_PRIVATE_KEY;

        jwt.verify(token, jwt_private_key, { algorithm: "HS256" }, (err, payload) => {

            if (err) {
                if (err.message === "jwt expired") {
                    next(498);
                } else {
                    next(401);
                }
            } else {

                if (payload.id)
                    res.locals.user = { id: payload.id };

                next();
            }

        });
    }
}