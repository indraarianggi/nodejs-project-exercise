// import dependencies
var mongoose = require('mongoose');

// create a database schema
var Schema = mongoose.Schema;
var eventSchema = new Schema({
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
        type: Boolean,
        required: true
    }
});


// export database model based on eventSchema
module.exports = mongoose.model('Event', eventSchema);
