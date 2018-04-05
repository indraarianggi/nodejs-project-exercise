// import dependencies
const express = require('express');
const path = require('path');

const routerIndex = require('./routes/index');
const routerUser = require('./routes/user');

// init app
const app = express();

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
