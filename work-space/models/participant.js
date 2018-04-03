// import dependencies
var mongoose = require('mongoose');

// create a database schema
var Schema = mongoose.Schema;
var participantSchema = new Schema({
    event_id: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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

// export database model based on participantSchema
module.exports = mongoose.model('Participant', participantSchema);
