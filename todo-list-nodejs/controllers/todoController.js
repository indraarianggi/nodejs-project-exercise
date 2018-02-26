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


// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        // get data from mongodb and pass it to view
        Todo.find({}, function(err, data) {
            // if error
            if (err) throw err;
            // if success -> render view and pass the data
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        // get data from the view and add it to mongodb
        var newTodo = Todo({item: req.body.item}).save(function(err, data) {
            // if error
            if (err) throw err;
            // if success
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
            // if error
            if (err) throw err;
            // if success
            res.json(data);
        });

        console.log(`${req.params.item} was deleted`);
    });

}
