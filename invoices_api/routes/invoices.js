"use strict";

const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');
const { v4: uuidv4 } = require('uuid');


router.post('/', async (req, res, next) => {
  try {

    const data = req.body;

    const customer = await Customer.find({ uuid: data.customer });

    data.customer = customer._id;
    data.uuid = uuidv4();

    const invoice = new Invoice(data);
    await invoice.save();
    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:uuid', async (req, res, next) => {
  try {
    const invoice = await Invoice.findOne({ uuid: req.params.uuid });
    res.json(invoice);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const invoices = await Invoice.find({});
    res.json(invoices);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put('/:uuid', async (req, res, next) => {
  try {
    let original = await Invoice.findOne({ uuid: req.params.uuid });

    original.status = req.body.status;
    original.file = req.body.file;
    original.invoice = req.body.invoice;
    original.date = req.body.date;
    await original.save();

    res.status(200).json(original);

  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:uuid', async (req, res, next) => {
  try {
    let original = await Invoice.findOne({ uuid: req.params.uuid });

    if (req.body.status !== undefined && req.body.status !== null && req.body.status !== "")
      original.status = req.body.status;

    if (req.body.file !== undefined && req.body.file !== null && req.body.file !== "")
      original.file = req.body.file;

    if (req.body.invoice !== undefined && req.body.invoice !== null && req.body.invoice !== "")
      original.invoice = req.body.invoice;

    if (req.body.date !== undefined && req.body.date !== null && req.body.date !== "")
      original.date = req.body.date;

    await original.save();

    res.status(200).json(original);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.all("/", (req, res, next) => {
  res.sendStatus(405);//Method Not Allowed
});

module.exports = router;
