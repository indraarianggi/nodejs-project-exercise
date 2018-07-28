const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const AdminSchema = new Schema({
    name: {
        type    : String,
        required: true
    },
    email: {
        type    : String,
        required: true
    },
    password: {
        type    : String,
        required: true
    },
    image: {
        type    : String
    }
});

module.exports = mongoose.model('Admin', AdminSchema);
