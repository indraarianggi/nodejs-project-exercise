const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const OrderSchema = new Schema({
    orderCode: {
        type    : String,
        uppercase: true
    },
    user: {
        type    : Schema.Types.ObjectId,
        ref     : 'User',
        required: true
    },
    date: {
        type    : Date,
        default : Date.now
    },
    details: [
        {
            detailFilm          : String,
            detailQuantity      : Number,
            detailInstruction   : String,
            detailNote          : String
        }
    ],
    price: {
        type    : Number
    },
    status: {
        type    : Number,
        enum    : [0, 1, 2, 3, 4, 5, 6, 7]
        /* Status
            0   => Menunggu konfirmasi dari OctoLab (mengenai jumlah harga yang harus dibayar)
            1   => Menunggu konfirmasi pembayaran & prngiriman oleh user
            2   => Menunggu Film Sampai (pembayaran sudah dikonfirmasi oleh user dan OctoLab, OctoLab menunggu film yang dikirimkan user sampai)
            3   => Film Telah Diterima  (film sudah sampai ditangan OctoLab)
            4   => Film Sedang Diproses (proses pencucian)
            5   => Film Selesai Diproses (link download telah tersedia)
            6   => Film Telah Dikirim (film telah dikirim kembali ke user)
            7   => Order dibatalkan
        */
    },
    invoice1: {             // Invoice pengiriman oleh user
        type    : String
    },
    invoice2: {             // Invoice pengiriman oleh OctoLab
        type    : String
    },
    payment: {              // Untuk mengubah status menjadi 1
        status  : {
            type    : Boolean,
            default : false
        },
        name    : String,
        bank    : String,
        proof   : String
    },
    downloadLink: {
        type    : String
    },
    sendBack: {
        type    : Boolean,
        default : true,
        required: false
    },
    allowPost: {
        type    : Boolean,
        default : true,
        required: false
    },
    note: {
        type    : String
    }
});

module.exports = mongoose.model('Order', OrderSchema);
