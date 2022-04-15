const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const invoices = [
    {
      uuid: '1234567890',
    },
    {
      uuid: '1234567890',
    },
    {
      uuid: '1234567890',
    },
    {
      uuid: '1234567890',
    },
    {
      uuid: '1234567890',
    },
    {
      uuid: '1234567890',
    },
    {
      uuid: '1234567890',
    },
    {
      uuid: '1234567890',
    },
    {
      uuid: '1234567890',
    },
    {
      uuid: '1234567890',
    },
    {
      uuid: '1234567890',
    },
    {
      uuid: '1234567890',
    },
  ];
  res.json(invoices);
});

module.exports = router;
