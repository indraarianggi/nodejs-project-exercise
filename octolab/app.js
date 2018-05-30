const express = require('express');
const exphbs  = require('express-handlebars');
const logger = require('morgan');

const indexRoutes = require('./routes/index.route');

const app = express();

// Logger middleware
app.use(logger('dev'));

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// Static file
app.use(express.static(__dirname + '/public/'));

// Router
app.use('/', indexRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
