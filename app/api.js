module.exports = function(models){

    var User = models.user;
    var Person = models.person;
    var Counters = models.counters;

    var cloudinary = require('cloudinary');
    cloudinary.config({ 
        cloud_name: 'hvdnpm6dx', 
        api_key: '893746855269141', 
        api_secret: 'kdvaLWVGZ4pyby-nPQaDvx3MlDE' 
    });

    var _ = require('underscore');

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

    var addPhoto = function(id, path) {
        cloudinary.uploader.upload(
            path,
            function(result) { 
                var urlPhoto = {
                    url: result.url,
                    public_id: result.public_id
                };

                Person.findByIdAndUpdate(
                    id,
                    {$push: {photos: urlPhoto}},
                    {safe: true, upsert: true},
                    function(err, model) {
                         if (err){
                            console.log(err);
                        }                    
                        console.log("Success uploaded!! url: " + result.url);
                    }
                );
            },
            {
                //public_id: public_id, 
                crop: 'limit',
                width: 800,
                height: 800,                
                tags: [id]
            }      
        );
    }

    var removePhoto = function(key) {
        cloudinary.api.delete_resources([key], function(result){
            var urlPhoto = {
                public_id: key
            };

            Person.findOne({'photos.public_id': key}, function (err, people) {
                if (people) {
                    var query = { 'photos.public_id': key };
                    Person.update(query,  {$pull: { photos: urlPhoto }}, {safe: true, upsert: true}, function (err, people) {
                        if (err){
                            console.log(err);                        
                        }
                        console.log("Success removed!! photo key: " + key);
                    });
                }
            });
        });
    }

    return {

        signup: function (req,res)
        {

            var body = req.body;

            User.findOne({ username: body.username
            },function(err, user) {
                if (err)
                    res.send(500, {'message': err});
                // check to see if theres already a user with that email
                if (user) {
                    res.send(403, {'message': 'Usuário já existe!'});
                }else {
                    var newUser = new User({ username: body.username,email: body.email, password:body.password})
                    newUser.save(function (err, user) {
                        if (err){
                            res.send(500, {'message': err});
                        }
                        res.json({ 'message': 'Usuário criado com sucesso!'});
                    });
                }
            });
        },

        login:function(req,res)
        {
            res.json({ auth_token: req.user.token.auth_token});
        },

        logout: function(req,res)
        {
            req.user.auth_token = null;
            req.user.save(function(err,user){
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ message: 'See you!'});
            });
        },

        createPerson: function(req,res)
        {
            var person = req.body.person;

            if (typeof person.name != "string") {
                res.send(400, {'message': "Digite o nome correto!"});
            }
            if (typeof person.age != "number") {
                res.send(400, {'message': "Digite a idade correta!"});
            }

            var newPerson = new Person({ name: person.name, age: person.age})
            newPerson.save(function (err, user) {
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ 'person': user, 'message': 'Registro adicionado com sucesso!'});
            });

        },

        removePhoto: function(req,res)
        {
             //process.stdout.write('\033c');
            var key = req.body.key;                

            removePhoto(key);

            res.json({ 'message': 'Registro removido com sucesso!'});            
        },

        uploadPhoto: function(req,res)
        {
            //process.stdout.write('\033c');
            var _id = req.body.idPerson;                

            if (Array.isArray(req.files.kartik)) {
                _.each(req.files.kartik, function(item){
                    res.json({ message: addPhoto(_id, item.path)});
                });
            } else {
                //console.log(req.files.kartik.name);
                //console.log(req.files.kartik.path);       
                res.json({ message: addPhoto(_id, req.files.kartik.path)});
            }                    
        },

        updatePerson: function(req,res)
        {
            var _id = req.params.id;
            var person = req.body.person;

            var query = { _id: _id };
            Person.update(query, {name:person.name,age:person.age}, null, function (err, thing) {
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ 'message': 'Registro atualizado com sucesso!'});
            })
        },

        removePerson: function(req,res)
        {
            var _id = req.params.id;
            
            Person.findOne({_id: _id}, function (err, person) {
                if (!err){
                    console.log(person);
                    if (Array.isArray(person.photos)) {
                        _.each(person.photos, function(item){
                            removePhoto(item.public_id);
                        });      
                    }
                }          
            });

            Person.remove({ _id:_id}, function (err, user) {
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ 'message': 'Registro removido com sucesso!'});
            })

        },

        getPeople: function(req,res)
        {
            Person.find(function(err,people){
                res.json({people: people });
            })
        },

		getOnePeople: function(req,res)
        {
            var _id = req.params.id;
            Person.findOne({_id: _id}, function (err, people) {
                res.json({people: people });
            })
        },

    }

}



