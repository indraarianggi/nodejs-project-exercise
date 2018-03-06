var mongoose = require('mongoose');

// create a database schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

// export database model based on userSchema
module.exports = mongoose.model('User', userSchema);