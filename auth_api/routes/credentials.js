"use strict";

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Credential = require('../models/Credential');
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res, next) => {
    const { user_uuid, password } = req.body;

    console.log(req.body)

    try {
        const hash = await bcrypt.hash(password, saltRounds);

        const new_credential = new Credential({ uuid: uuidv4(), user_uuid: user_uuid, password: hash });
        await new_credential.save();

        res.sendStatus(201);

    } catch (error) {
        console.error(error);
        next(500);
    }

});


router.all("/", (req, res, next) => {
    res.sendStatus(405);//Method Not Allowed
});

module.exports = router;
