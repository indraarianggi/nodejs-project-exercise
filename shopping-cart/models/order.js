var mongoose = require('mongoose');

// create a database schema
var Schema = mongoose.Schema;
var orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required: true},
    address: {type: String, required: true},
    name: {type: String, required: true}
});

// export database model based on productSchema
module.exports = mongoose.model('Order', orderSchema);