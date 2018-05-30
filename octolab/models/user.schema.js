const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
    createdAt: {
        type    : Date,
        default : Date.now
    },
    name: {
        type    : String
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
    },
    phone: {
        type    : String
    },
    address: {
        address     : String,
        village     : String,
        sub_district: String,
        district    : String,
        province    : String,
        postal_code : Number
    },
    order: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    verified: {
        type    : Boolean,
        default : false
    }
});

module.exports = mongoose.model('User', UserSchema);
