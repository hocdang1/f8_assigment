const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const apiV1Router = require('./routes/api-v1');
const sortMiddleware = require('./middlewares/sortMiddleware');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// custom middleware: phải đặt trước các route
app.use(sortMiddleware);

app.use('/api/v1', apiV1Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler: luôn trả về JSON
app.use(function(err, req, res, next) {
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message,
    ...(req.app.get('env') === 'development' && { stack: err.stack }),
  });
});

module.exports = app;
