var express = require('express');
var app = express();

var mongoose = require('mongoose');

// conenct to mongodb local database
mongoose.connect('mongodb://localhost/jwttutorial');

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);


var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});