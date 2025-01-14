var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var categoryRouter = require('./routes/category');
var menuRouter = require('./routes/menu');
var currencyRouter = require('./routes/currency');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('debug', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(menuRouter);
app.use('/', indexRouter);
app.param('root', (req, res, next, root) => {
  req.root = root; // Store the value of 'root' in the request object
  next();
});
app.use('/api',currencyRouter);

app.use('/:root', categoryRouter);
app.use('/:root/:category', categoryRouter);
app.use('/:root/:category/:subcategory', categoryRouter);
app.use('/:root/:category/:subcategory/:productID', categoryRouter);


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
