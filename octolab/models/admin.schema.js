const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const AdminSchema = new Schema({
    createdAt: {
        type    : Date,
        default : Date.now
    },
    name: {
        type    : String,
        required: true
    },
    username: {
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
    }
});

module.exports = mongoose.model('Admin', AdminSchema);
