var cryptoJS = require("crypto-js/crypto-js");

module.exports = function(models){

    var User = models.user;
    var Person = models.person;
    var Counters = models.counters;
    
    var email = 'marcos.tomazini@gmail.com';

    var getNextSequenceValue = function (sequenceName){
        console.log("supdadetee   adsadsdsasadsaddsadsadsadsadsadsadsa")

       var sequenceDocument = Counters.update({_id: sequenceName }, {$inc:{sequence_value:1}}, null, function (err, counters) {
            if (err){
                console.log("daas 899");
            }
            console.log(counters);
        })
       return sequenceDocument.sequence_value;
    }
    
    var userExists = function () {
        User.findOne({email: email}, function (err, user) {
            if (!err && !user) {
                createUser();
            }
        });        
    }

    var createUser = function () {                

        var pass = '123teste';

        var newUser = new User({
            username: email,
            password: cryptoJS.PBKDF2(pass, email, { keySize: 256/32 }),
            email: email
        });

        newUser.save(function (err, user) {
            if (err){
                console.log('Erro ao criar usuario: ' + err);
            } else {
                console.log('create user...');
            }            
        });
    }

    return {        
        go: function ()
        {
            console.log('running initial data db...');
            userExists();
        }
    }

}



