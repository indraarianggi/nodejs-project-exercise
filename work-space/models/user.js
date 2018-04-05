// import dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// create a database schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    birth_date: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required:true
    },
    profile_pict: {
        type: String
    }
});

// object method => password encryption
userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

// object method => compare input password with stored password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


// export database model based on userSchema
module.exports = mongoose.model('User', userSchema);
