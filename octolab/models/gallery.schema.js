const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const GallerySchema = new Schema({
    createdAt: {
        type    : Date,
        default : Date.now
    },
    title: {
        type    : String,
        required: true
    },
    description: {
        type    : String
    },
    detail: {
        date    : Date,
        place   : String,
        film    : String,
        camera  : String
    }
});

module.exports = mongoose.model('Gallery', GallerySchema);
