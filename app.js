var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var registrationRouter = require('./routes/api/v1/registration');
var loginRouter = require('./routes/api/v1/login');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', registrationRouter);
app.use('/api/v1/sessions', loginRouter);

module.exports = app;
