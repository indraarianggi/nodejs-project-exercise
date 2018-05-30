const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const ProfileSchema = new Schema({
    name: {
        type    : String,
        required: true
    },
    description: {
        type    : String
    },
    email: {
        type    : String,
        required: true
    },
    phone: {
        type    : String,
        required: true
    },
    address: {
        address     : String,
        village     : String,
        sub_district: String,
        district    : String,
        province    : String,
        postal_code : Number
    },
    social: {
        instagram   : String,
        facebook    : String,
        twitter     : String
    }
});

module.exports = mongoose.model('Profile', ProfileSchema);
