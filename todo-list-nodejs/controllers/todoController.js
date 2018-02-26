// import module
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to the database
// *database using mongodb host in mlab.com
mongoose.connect('mongodb://test:test@ds247678.mlab.com:47678/tododb');

// create a schema - this is like a data blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

// create model based on todoSchema
var Todo = mongoose.model('Todo', todoSchema);
// create item of model and save to database
var itemOne = Todo({item: 'learn node.js'}).save(function(err) {
    if (err) throw err;
    console.log('item saved');
});

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        res.render('todo');
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        
    });

    app.delete('/todo', function(req, res) {
        
    });

}
