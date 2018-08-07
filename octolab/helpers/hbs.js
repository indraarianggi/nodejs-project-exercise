const moment = require('moment');

module.exports = {
    formatDate: function(date, format) {
        return moment(date).format(format);
    },
    orderStatus: function(code) {
        let status;
        switch (code) {
            case 0:
                status = "Menunggu konfirmasi harga dari OctoLab.";
                break;
            case 1:
                status = "Menunggu konfirmasi pembayaran & pengiriman oleh user.";
                break;
            case 2:
                status = "Menunggu film dari user sampai.";
                break;
            case 3:
                status = "Film telah diterima oleh OctoLab.";
                break;
            case 4:
                status = "Film sedang diproses (cuci dan atau scan).";
                break;
            case 5:
                status = "Film selesai diproses."
                break;
            case 6:
                status = "Film telah dikirimkan kembali ke user."
                break;
            case 7:
                status = "Order dibatalkan oleh OctoLab";
                break;
            default:
                break;
        }

        return status;
    }
}
