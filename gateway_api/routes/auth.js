"use strict";

const express = require('express');
const router = express.Router();
const axios = require('axios');

const end_point = "http://auth_api:3000/";

router.post('/signup', async (req, res, next) => {

    try {
        const result = await axios.post(end_point + "signup", req.body);
    } catch (error) {
        //console.error(error);
        if (error.response !== undefined) {
            next(error.response.data);
        } else {
            next(error);
        }
    }

});

router.post('/check-token', async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];//Bearer Authorization

    if (token === undefined) {
        return next(400);
    }

    try {
        const result = await axios.post(end_point + "auth/check-token", { token: token });

        if (result.status === 200) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }

    } catch (error) {

        if (error.response !== undefined) {
            next(error.response.status);
        } else {
            next(error);
        }
    }


});

router.post('/signin', async (req, res, next) => {

    if (typeof req.headers.authorization == undefined || !req.headers.authorization) {
        next(401);
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    [email, password] = credentials.split(':');

    email = email.trim().toLowerCase();
    password = password.trim();

    if (req.headers.authorization) {
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        [email, password] = credentials.split(':');
    }


    try {
        const result = await axios.get(`http://users_api:3000/users?email=${email}`);

        const user = result.data;

        if (user === null) {
            return next(400);
        } else {
            const result = await axios.post(end_point + "auth/signin", { email: user.email, password: password, user_uuid: user.uuid });
            res.json(result.data);
        }

    } catch (error) {
        //console.error(error);
        if (error.response !== undefined) {
            next(error.response.data);
        } else {
            next(error);
        }
    }

});

router.post('/refresh', async (req, res, next) => {

    try {
        const result = await axios.post(end_point + "refresh", req.body);
    } catch (error) {
        //console.error(error);
        if (error.response !== undefined) {
            next(error.response.data);
        } else {
            next(error);
        }
    }

});


router.all("/", (req, res, next) => {
    res.sendStatus(405);//Method Not Allowed
});


module.exports = router;