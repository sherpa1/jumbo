const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {

  res.sendStatus(200);

});

router.all("/", (req, res, next) => {
  res.sendStatus(405);//Method Not Allowed
});

module.exports = router;
