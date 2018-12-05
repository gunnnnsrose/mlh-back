var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register')
var loginRouter = require('./routes/login')
var mongoose = require('mongoose')
var session = require('express-session')
mongoose.connect('mongodb://localhost:27017/mlh')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	name:'NodeID',//cookie中的K值 随便起
	secret:'aaaa',//对原始ID进行混淆
	cookie:{maxAge: 1000*3600 }, //1小时
	resave: true,
	saveUninitialized: true//不管有没有登陆成功都给我分一个cookie
}));
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/v4/register', registerRouter);
app.use('/v4/login', loginRouter);

/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
