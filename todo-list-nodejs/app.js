var express = require('express');

var app = express();

// set template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));


// listen to port
app.listen(3000);
console.log('Listening to port 3000');
