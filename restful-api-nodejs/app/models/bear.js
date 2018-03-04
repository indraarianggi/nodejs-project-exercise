var mongoose = require('mongoose');

// create a database schema
var Schema = mongoose.Schema;
var BearSchema = new Schema({
    name: String
});

// export database model based on schema
module.exports = mongoose.model('Bear', BearSchema);