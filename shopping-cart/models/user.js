var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// create a database schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

// object method => untuk men-encrypt password
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

// object method => untuk men-compare antara password yang tersimpan dengan password yang diinput
userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

// export database model based on userSchema
module.exports = mongoose.model('User', userSchema);