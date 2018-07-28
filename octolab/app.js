const express = require('express');

// Load Routes
const index = require('./routes/index');


const app = express();

// Use Routes
app.use('/', index);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});
