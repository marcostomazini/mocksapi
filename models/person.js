var mongoose = require('mongoose');

module.exports = function(connection) {

    var Schema = mongoose.Schema;

    var personSchema = new Schema({
        name: String,
        age: Number,
        photos: []
    });

    var Person = connection.model('Person', personSchema);

    return Person;
}