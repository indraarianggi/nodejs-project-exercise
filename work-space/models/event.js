// import dependencies
const mongoose = require('mongoose');

// create a database schema
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    event_name: {
        type: String,
        required: true
    },
    event_type: {
        type: String,
        required: true
    },
    event_detail: {
        type: String,
        required: true
    },
    seat: {
        type: Number,
        required: true
    },
    event_date: {
        type: Date,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    event_price: {
        type: Number,
        required: true
    },
    event_sponsor: {
        type: String
    },
    event_poster: {
        type: String
    },
    event_status: {
        type: String,
        required: true
    },
    event_participants: [
        {
            user_id: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            payment_status: {
                type: String,
                required: true
            },
            patment_deadline: {
                type: Date,
                required: true
            },
            confirm_time: {
                type: Date
            }
        }
    ]
});


// export database model based on eventSchema
module.exports = mongoose.model('Event', eventSchema);
