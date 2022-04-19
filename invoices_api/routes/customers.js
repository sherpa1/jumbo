const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Customer = require('../models/Customer');

router.post('/', async (req, res, next) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(200).json(customer);
    } catch (error) {
        next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const customers = await Customer.find({});
        res.json(customers);
    } catch (error) {
        next(error);
    }
});

router.get('/:uuid', async (req, res, next) => {
    try {
        const customer = await Customer.findOne({ uuid: req.params.uuid });
        res.json(customer);
    } catch (error) {
        next(error);
    }
});


router.put('/:uuid', async (req, res, next) => {
    try {
        let original = await Customer.findOne({ uuid: req.params.uuid });

        res.json(customer);
    } catch (error) {
        next(error);
    }
});

router.all("/", (req, res, next) => {
    res.sendStatus(405);//Method Not Allowed
});

module.exports = router;
