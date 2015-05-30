var mongoose = require('mongoose');

module.exports = function(connection) {

    var Schema = mongoose.Schema;

    var countersSchema = new Schema({
        _id: String,
        sequence_value: Number
    });

    var Counters = connection.model('Counters', countersSchema);

    return Counters;
}