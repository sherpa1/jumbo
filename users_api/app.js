"use strict";

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const MongoDBConnect = require('./utils/MongoDBConnect');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// app.response.json = function (body) {
//     console.log(body);
//     return this.json(body);
// }

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.sendStatus(err || 500);
});


module.exports = app;
