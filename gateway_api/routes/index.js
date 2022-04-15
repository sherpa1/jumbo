const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/invoices', async (req, res, next) => {

  try {
    const result = await axios.get('http://invoices_api:3000');
    res.json(result.data);
  } catch (error) {
    next(error);
  }

});

module.exports = router;
