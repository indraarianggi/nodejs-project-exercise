// import dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const logger = require('morgan');

const routerIndex = require('./routes/index');
const routerAdmin = require('./routes/admin');
const routerUser = require('./routes/user');

// init app
const app = express();

// connect to database
mongoose.connect('mongodb://localhost:27017/dbworkspace');

// passport configuration
require('./config/passport');

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'workspacesecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// static file
app.use(express.static('./public'));

app.use((req, res, next) => {
    // define global variable
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

// router
app.use('/', routerIndex);
app.use('/admin', routerAdmin);
app.use('/user', routerUser);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error Handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('pages/error');
});

// set port
let port = process.env.PORT || 3000;
// start the server
app.listen(port);
console.log(`Server start at port ${port}`);
