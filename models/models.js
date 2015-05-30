module.exports = function(connection) {

    var User = require('./user')(connection);
    var Person = require('./person')(connection);
    var Counters = require('./counters')(connection);

    return {
        user: User,
        person: Person,
        counters: Counters
    }
}