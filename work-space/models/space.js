// import dependencies
const mongoose = require('mongoose');

// create a database schema
const Schema = mongoose.Schema;
const spaceSchema = new Schema({
    space_name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    }
});

// export database model based on spaceSchema
module.exports = mongoose.model('Space', spaceSchema);
