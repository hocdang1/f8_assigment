const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
// const mongoose = require('mongoose');
// const db = require('config')
// // db connect
// db.connectDB()
const indexRouter = require('./routes/index');
const courseRouter = require('./routes/course');
const meRouter = require('./routes/me');
const apiV1Router = require('./routes/api-v1');
const app = express();

const sortMiddleware = require('./middlewares/sortMiddleware');
const sortable = require('./helpers/sortable');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// helper dùng được trong mọi file .ejs
app.locals.sortable = sortable;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method')); // cho phép form gửi PUT/PATCH/DELETE qua ?_method=
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// custom middleware: phải đặt trước các route
app.use(sortMiddleware);

app.use('/', indexRouter);
app.use('/me', meRouter);
app.use('/course', courseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.locals.status = err.status || 500;
  res.status(res.locals.status);
  res.render('error');
});

module.exports = app;
