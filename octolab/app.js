const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

// Load Routes
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');


const app = express();

// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', indexRouter);
app.use('/user', userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});
