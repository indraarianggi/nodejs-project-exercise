const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
    role: {
        type    : String,
        enum    : ['user', 'admin'],
        default : 'user'
    },
    googleID: {
        type    : String,
        required: false
    },
    name: {
        type    : String,
        required: true
    },
    email: {
        type    : String,
        required: true
    },
    password: {
        type    : String
    },
    telephone: {
        type: String
    },
    address: {
        address : String,
        city: String,
        province: String,
        postal_code : String,
        state   : String
    },
    image: {
        type    : String
    },
    instagram: {
        type    : String
    },
    date: {
        type    : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
