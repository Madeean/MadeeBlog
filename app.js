var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
var cors = require('cors')

// memanggil router
var AuthRouter = require('./app/Auth/router')
var Landing = require('./app/Landing/router')
var Dashboard = require('./app/Dashboard/router')
var User = require('./app/User/router')
var Category = require('./app/Category/router')
var Artikel = require('./app/Artikel/router')


var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave:false,
    saveUninitialized:true,
    cookie:{ }
  }));
app.use(flash());
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(__dirname + '/public'));

// tempat taruh http router
app.use('/', AuthRouter);
app.use('/',Landing)
app.use('/dashboard',Dashboard)
app.use('/user',User)
app.use('/category',Category)
app.use('/artikel',Artikel)

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