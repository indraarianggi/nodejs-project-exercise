// import dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// create a database schema
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// object method => password encryption
adminSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

// object method => compare input password with stored password
adminSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// export database model based on adminSchema
module.exports = mongoose.model('Admin', adminSchema);
