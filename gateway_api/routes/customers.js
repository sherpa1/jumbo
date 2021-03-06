"use strict";

const express = require('express');
const router = express.Router();
const axios = require('axios');

const end_point = "http://invoices_api:3000/customers/";

router.get('/:uuid', async (req, res, next) => {

    try {
        const result = await axios.get(end_point + req.params.uuid);
        res.json(result.data);
    } catch (error) {
        //console.error(error);
        next(error);
    }

});


router.get('/', async (req, res, next) => {

    try {
        const result = await axios.get(end_point);
        res.json(result.data);
    } catch (error) {
        //console.error(error);
        next(error);
    }

});

router.post('/', async (req, res, next) => {

    try {
        const result = await axios.post(end_point, req.body);
        res.json(result.data);
    } catch (error) {
        //console.error(error);
        next(error.response);
    }

});

router.put('/:uuid', async (req, res, next) => {

    try {
        const result = await axios.put(end_point + req.params.uuid, req.body);
        res.json(result.data);
    } catch (error) {
        //console.error(error);
        next(error.response.data);
    }

});

router.patch('/:uuid', async (req, res, next) => {

    try {
        const result = await axios.get(end_point + req.params.uuid, req.body);
        res.json(result.data);
    } catch (error) {
        //console.error(error);
        next(error.response.data);
    }

});

router.delete('/:uuid', async (req, res, next) => {

    try {
        const result = await axios.delete(end_point + req.params.uuid);
        res.json(result.data);
    } catch (error) {
        //console.error(error);
        next(error.response.data);
    }

});

router.all("/", (req, res, next) => {
    res.sendStatus(405);//Method Not Allowed
});

module.exports = router;
