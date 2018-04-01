// import dependencies
var express = require('express');
var path = require('path');

var routerIndex = require('./routes/index');
var routerUser = require('./routes/user');

// init app
var app = express();

// set port
var port = process.env.PORT || 3000;

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// static file
app.use(express.static('./public'));

// router
app.use('/', routerIndex);
// app.use('/user', routerUser);


// start the server
app.listen(port);
console.log(`Server start at port ${port}`);
