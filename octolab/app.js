const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const keys = require('./config/keys');

// Load Passport Configuration
require('./config/passport');
require('./config/passport.admin');

// Load Routes
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');

// Load handlebars helpers
const {formatDate, orderStatus} = require('./helpers/hbs');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));


const app = express();

// Cookie Parser Middleware
app.use(cookieParser());
// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        formatDate  : formatDate,
        orderStatus : orderStatus
    }
}));
app.set('view engine', 'handlebars');

// Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Global Variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.success_msg = req.flash('success');
    res.locals.error_msg = req.flash('error');
    next();
});

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});
