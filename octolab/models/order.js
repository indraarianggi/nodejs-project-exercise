const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const OrderSchema = new Schema({
    user: {
        type    : Schema.Types.ObjectId,
        required: true
    },
    date: {
        type    : Date,
        default : Date.now
    },
    details: [
        {
            detailFilm  : String,
            detailNumber: Number,
            detailInstruction   : String,
            detailNote  : String
        }
    ],
    price: {
        type    : Number
    },
    status: {
        type    : String,
        // enum    : []
    },
    proofPayment: {
        type    : String
    },
    downloadLink: {
        type    : String
    },
    allowPost: {
        type    : Boolean,
        default : true,
        required: true
    },
    note: {
        type    : String
    }
});

module.exports = mongoose.model('Order', OrderSchema);
