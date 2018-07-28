const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
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
        type    : String,
        required: true
    },
    telephone: {
        type: String
    },
    address: {
        address : String,
        district: String,
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
