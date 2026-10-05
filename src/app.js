const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const routes = require('./routes');
const config = require('./config');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(createError(404));
});

// error handler: luôn trả về JSON
app.use(function (err, _req, res, _next) {
    // dữ liệu nhập sai (validate của Sequelize) là lỗi 400, không phải 500
    if (err.name === 'SequelizeValidationError') {
        err.status = 400;
        err.message = err.errors.map((e) => e.message).join(', ');
    }

    const status = err.status || 500;

    res.status(status).json({
        success: false,
        message: err.message || err.name,
        ...(config.environment === 'development' && { stack: err.stack }),
    });
});

module.exports = app;
