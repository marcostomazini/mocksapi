module.exports = function(connection) {

    var User = require('./user')(connection);
    var Person = require('./person')(connection);

    return {
        user: User,
        person: Person
    }
}