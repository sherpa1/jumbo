"use strict";

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Credential = require("../models/Credential");
const RefreshToken = require('../models/RefreshToken');
const jwt = require('jsonwebtoken');
const hour = 60 * 60;
const jwt_expiration = 1 * hour;
const jwt_private_key = process.env.JWT_PRIVATE_KEY;
const jwt_refresh_private_key = process.env.JWT_REFRESH_PRIVATE_KEY;


async function create_token(user_uuid) {
  const refresh_token = jwt.sign({}, jwt_refresh_private_key, { algorithm: 'HS256', expiresIn: jwt_expiration });

  await RefreshToken.deleteMany({ user_uuid: user_uuid });

  const refresh_token_to_save = new RefreshToken({ refresh_token: refresh_token, user_uuid: user_uuid });
  await refresh_token_to_save.save();

  const token = jwt.sign({ user_uuid: user_uuid }, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: jwt_expiration });

  return { token, refresh_token };
}

router.post('/check-token', async (req, res, next) => {

  const { token } = req.body;
  if (token === undefined) {
    return next(400);
  }


  try {
    const payload = await jwt.verify(token, jwt_private_key, { algorithm: "HS256" });

    if (payload !== undefined) {

      if (payload.user_uuid)
        res.locals.user = { user_uuid: payload.uuid };
    }

    res.sendStatus(200);

  } catch (error) {

    //console.error(error);

    if (error.message !== undefined) {
      if (error.message === "jwt expired") {
        next(498);
      } else {
        next(401);
      }
    } else {
      next(401);
    }

  }

});

router.post('/refresh', async (req, res, next) => {

  const { token, refresh_token } = req.body;



  if (token === undefined || refresh_code === undefined) {
    return next(400);
  }


  try {
    const payload = await jwt.verify(token, jwt_private_key, { algorithm: "HS256" });
    const { user_uuid } = payload;

    const check_refresh_token = await jwt.verify(refresh_token, jwt_refresh_private_key, { algorithm: "HS256" });

    const stored_refresh_token = RefreshToken.findOne({ user_uuid: user_uuid, refresh_token: refresh_token });
    if (stored_refresh_token !== null) {

      const refresh_token = jwt.sign({}, jwt_refresh_private_key, { algorithm: 'HS256', expiresIn: jwt_expiration });

      await RefreshToken.deleteMany({ user_uuid: user_uuid });

      const refresh_token_to_save = new RefreshToken({ refresh_token: refresh_token, user_uuid: user_uuid });
      await refresh_token_to_save.save();

      const token = jwt.sign({ user_uuid: user_uuid }, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: jwt_expiration });

      res.json({ token, refresh_token });

    } else {
      next(401);
    }



  } catch (error) {

    //console.error(error);

    if (error.message !== undefined) {
      if (error.message === "jwt expired") {
        next(498);
      } else {
        next(401);
      }
    } else {
      next(401);
    }

  }

});

router.post('/signin', async (req, res, next) => {


  const { user_uuid, email, password } = req.body;

  try {

    const user_credential = await Credential.findOne({ user_uuid: user_uuid, email: email });

    if (user_credential === null) {
      return next(404);
    }

    const check = await bcrypt.compare(password, user_credential.password);

    if (check === true) {

      const refresh_token = jwt.sign({}, jwt_refresh_private_key, { algorithm: 'HS256', expiresIn: jwt_expiration });

      await RefreshToken.deleteMany({ user_uuid: user_uuid });

      const refresh_token_to_save = new RefreshToken({ refresh_token: refresh_token, user_uuid: user_uuid });
      await refresh_token_to_save.save();

      const token = jwt.sign({ user_uuid: user_uuid }, process.env.JWT_PRIVATE_KEY, { algorithm: 'HS256', expiresIn: jwt_expiration });

      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ token, refresh_token });

    } else {
      next(401);
    }
  } catch (error) {
    console.error(error);
    next(401);
  }

});

// router.post('/signup', async (req, res, next) => {

// });

// router.post('/refresh', async (req, res, next) => {
// });

router.all("/", (req, res, next) => {
  res.sendStatus(405);//Method Not Allowed
});

module.exports = router;
