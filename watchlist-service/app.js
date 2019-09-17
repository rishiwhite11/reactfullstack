var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
const cookieSession = require('cookie-session');
var index = require('./routes/index');
var users = require('./routes/users');
require('./services/passport');
const authRouter = require('./routes/authRouter');
var app = express();
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://192.168.99.107");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", 'true');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ["asgdfgasfdafshdgfadgfashdg"]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);
app.use('/users', users);
app.use('/auth', authRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
//mongoose.connect("mongodb://mongodb-cluster-ip-service:27017/ckad-db");
mongoose.connect("mongodb://mongo:6000/ckad-db");
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({error:err});
});

module.exports = app;
