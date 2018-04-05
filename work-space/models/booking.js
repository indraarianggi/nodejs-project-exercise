// import dependencies
const mongoose = require('mongoose');

// create a database schema
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    booking_id: {
        type: String,
        required: true
    },
    organization: {
        type: String
    },
    name: { // penanggung jawab
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    space_id: {
        type: Schema.Types.ObjectId,
        ref: 'Space'
    },
    title: {
        type: String
    },
    detail: {
        String: String
    },
    amount: {
        type: Number,
        required: true
    },
    patment_deadline: {
        type: Date,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    },
    confirm_time: {
        type: Date
    }
});

// export database model based on bookingSchema
module.exports = mongoose.model('Booking', bookingSchema);
