// import dependencies
const mongoose = require('mongoose');

// create a database schema
const Schema = mongoose.Schema;
const usedspaceSchema = new Schema({
    event_id: {
        type: Schema.Types.ObjectId,
        // ref: 'Event', and Booking (???)
        required: true
    },
    space_id: {
        type: Schema.Types.ObjectId,
        ref: 'Space',
        required: true
    },
    date: {
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
    status: {
        type: String,
        required: true
    }
});

// export database model based on usedspaceSchema
module.exports = mongoose.model('Usedspace', usedspaceSchema);
