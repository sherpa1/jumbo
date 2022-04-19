const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const invoicesRouter = require('./routes/invoices');
const customersRouter = require('./routes/customers');

const isBadRequest = require('./middlewares/isBadRequest');

const app = express();
app.use(isBadRequest);
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/invoices', invoicesRouter);
app.use('/customers', customersRouter);

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
