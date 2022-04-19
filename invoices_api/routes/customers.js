"use strict";

const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');
const { v4: uuidv4 } = require('uuid');


router.post('/', async (req, res, next) => {

    const data = req.body;
    data.uuid = uuidv4();

    try {
        const customer = new Customer(data);
        await customer.save();
        res.status(200).json(customer);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const customers = await Customer.find({});
        res.json(customers);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:uuid', async (req, res, next) => {
    try {
        const customer = await Customer.findOne({ uuid: req.params.uuid });
        res.json(customer);
    } catch (error) {
        console.error(error);
        next(error);
    }
});


router.put('/:uuid', async (req, res, next) => {
    try {
        let original = await Customer.findOne({ uuid: req.params.uuid });

        res.json(customer);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.all("/", (req, res, next) => {
    res.sendStatus(405);//Method Not Allowed
});

module.exports = router;
