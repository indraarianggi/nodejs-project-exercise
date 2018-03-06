var mongoose = require('mongoose');

// create a database schema
var Schema = mongoose.Schema;
var productSchema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
});

// export database model based on productSchema
module.exports = mongoose.model('Product', productSchema);