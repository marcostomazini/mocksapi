module.exports = function(app, passport, models) {

    var api = require('./api.js')(models);

    var initialData = require('../db/initial.js')(models);
    initialData.go();

    app.get('/', function(req, res){
        res.render('index');
    });

    app.get('/partials/:name', showClientRequest, function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });

    app.get('/partials/auth/:name', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),function (req, res) {
        var name = req.params.name;
        res.render('partials/auth/' + name);
    });

    app.post('/api/login', showClientRequest, passport.authenticate('local-login', {
        session: false
    }),api.login);

    app.post('/api/signup', showClientRequest, api.signup);

    // UPLOAD PHOTO
    // app.post('/api/upload', showClientRequest ,api.uploadPhoto);

    // REMOVE PHOTO
    // app.post('/api/removephoto', showClientRequest, api.removePhoto);

    // UPLOAD PHOTO
    app.post('/api/upload', showClientRequest, showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.uploadPhoto);

    // REMOVE PHOTO
    app.post('/api/removephoto', showClientRequest, showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.removePhoto);

    app.get('/api/logout', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.logout);

    app.get('/api/people', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.getPeople);

	 app.get('/api/people/:id', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.getOnePeople);
	
    app.post('/api/person', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.createPerson);

    app.put('/api/person/:id', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.updatePerson);

    app.delete('/api/person/:id', showClientRequest, passport.authenticate('local-authorization', {
        session: false
    }),api.removePerson);
    
    function showClientRequest(req, res, next) {
        var request = {
            REQUEST : {
                HEADERS: req.headers,
                BODY : req.body
            }
        }
        console.log(request)
        return next();
    }
}