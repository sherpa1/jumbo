const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

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
        //res.json(user);
        next();
      }
    }

  } catch (error) {
    next(error);
  }

});

router.post('/', async (req, res, next) => {

  const data = req.body;

  try {
    data.password = await bcrypt.hash(data.password, saltRounds);
    const admin = new User(data);
    await admin.save();
    res.json(admin);
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