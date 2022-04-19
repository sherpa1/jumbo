const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/signin', async (req, res, next) => {
  let email, password;

  if (req.headers.authorization) {
    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    [email, password] = credentials.split(':');
  }

  if (email === undefined || email === '' || password === undefined || password === '') {
    next(400);
  } else {
    email = email.trim().toLowerCase();
    password = password.trim();

    let user, result;

    try {
      result = await axios.get(process.env.USERS_API + "/users?email=" + email);
      user = result.data;
      if (typeof user == "undefined") next(404);
    } catch (error) {
      console.error(error);
      next(500);
    }


    const hash = user.password;

    let check;

    try {
      check = await bcrypt.compare(password, hash);

      if (check === true) {

        const token = jwt.sign({ user_id: user.id }, jwt_private_key, { algorithm: 'HS256', expiresIn: jwt_expiration });

        user.password = '';

        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ token });

      } else {
        next(401);
      }
    } catch (error) {
      console.error(error);
      next(401);
    }
  }
});

router.post('/signup', async (req, res, next) => {
});

router.post('/refresh', async (req, res, next) => {
});

router.all("/", (req, res, next) => {
  res.sendStatus(405);//Method Not Allowed
});

module.exports = router;
