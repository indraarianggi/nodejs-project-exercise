const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create schema
const ProcedureSchema = new Schema({
    description: {
        type: String
    }
});

module.exports = mongoose.model('Procedure', ProcedureSchema);
