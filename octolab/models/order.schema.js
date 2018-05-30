const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const OrderSchema = new Schema({
    order_code: {
        type    : String,
        required: true
    },
    date: {
        type    : Date,
        default : Date.now
    },
    return_film: {
        type    : Boolean,
        default : false
    },
    detail: [
        {
            film        : String,
            quantity    : Number,
            instruction : String,
            note        : String
        }
    ],
    download_link: {
        type    : String
    },
    payment: {
        amount: Number,
        paid    : {
            type    : Boolean,
            default : false
        },
        confirm: {
            type    : Boolean,
            default : false
        },
        evidence: {
            type    : Buffer
        }
    },
    status: {
        type    : String,
        enum    : ['tunggu', 'terima', 'proses', 'selesai'],
        default : 'tunggu'
    }    
});

module.exports = mongoose.model('Order', OrderSchema);
