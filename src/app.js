const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const userCookieMiddleware = require('./middlewares/userCookieMiddleware');
const isLoggedMiddleware = require('./middlewares/isLoggedMiddleware');
const lastProductsMiddleware = require('./middlewares/lastProductsMiddleware');
const cartMiddleware = require('./middlewares/cartMiddleware');




const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'register-login',
  resave: false,
  saveUninitialized: true
}));
app.use(userCookieMiddleware);
// Middleware que setea res.locals va después del middleware de cookies
app.use(isLoggedMiddleware);
app.use(lastProductsMiddleware);
app.use(cartMiddleware);

const mainRouter = require('./routes/main')
app.use('/', mainRouter);

const productRouter = require('./routes/product')
app.use('/products', productRouter);

const userRouter = require('./routes/users')
app.use('/users', userRouter);

const apisRouter = require('./routes/apis')
app.use('/apis', apisRouter);

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
