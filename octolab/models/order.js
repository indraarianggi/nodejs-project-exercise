const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const OrderSchema = new Schema({
    uniqueID: {
        type    : String
    },
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
        type    : Number,
        enum    : [0, 1, 2, 3]
        /* Status
            0   => Menunggu Film Sampai (film dikirim oleh user, OctoLab menunggu film sampai)
            1   => Film Telah Diterima  (film sudah sampai ditangan OctoLab)
            2   => Film Sedang Diproses (proses pencucian)
            3   => Film Telah Dikirim   (film telah dikirim kembali ke user)
        */
    },
    invoice1: {             // Invoice pengiriman oleh user
        type    : String
    },
    invoice2: {             // Invoice pengiriman oleh OctoLab
        type    : String
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
