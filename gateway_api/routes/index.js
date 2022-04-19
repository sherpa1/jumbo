"use strict";

const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res, next) => {

  res.sendStatus(200);

});

module.exports = router;
