"use strict";

const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');


const saltRounds = 10;

router.get('/', async (req, res, next) => {

  try {

    if (!req.query.email || req.query.email === '') {
      const users = await User.find({});
      res.json(users);
    } else {
      const user = await User.findOne({ email: req.query.email });

      if (user === null) {
        next();//404
      } else {
        res.json(user);
      }
    }

  } catch (error) {
    console.error(error);
    next(error);
  }

});

router.post('/', async (req, res, next) => {

  const data = req.body;
  data.uuid = uuidv4();

  try {
    const new_user = new User(data);
    await new_user.save();

    res.json(new_user);
  } catch (error) {

    console.error(error);

    if (error.code === 11000) {//Duplicate entry
      next(422);//Unprocessable Entity
    } else {
      next(error);
    }

  }

});


router.all("/", (req, res, next) => {
  res.sendStatus(405);//Method Not Allowed
});

module.exports = router;