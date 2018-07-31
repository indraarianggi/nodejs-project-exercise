const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const keys = require('./config/keys');

// Load Passport Configuration
require('./config/passport');

// Load Routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose.connect(keys.mongoURI, {useNewUrlParser: true})
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));


const app = express();

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Session Middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Set Global Variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    // res.locals.success_msg = req.flash('success_msg');
    // res.locals.error_msg = req.flash('error_msg');
    // res.locals.error = req.flash('error');
    next();
});

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});
