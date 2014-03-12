var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;	
	ObjectID = mongo.ObjectID;

// DATA OBJECT
var	produtogrupo = require('./data/produtogrupo');
	produto = require('./data/produto');
	garcom = require('./data/garcom');	
	mesa = require('./data/mesa');
	consumomesa = require('./data/consumomesa');

var stringConexao = "ds033069.mongolab.com";
var portaConexao = 33069;

var server = new Server(stringConexao, portaConexao, {auto_reconnect: true});	
db = new Db('heroku_app22498672', server, {safe: true});	

db.open(function(err, db) {
	console.log("opening connection...");
	
	if(err) { return console.log("erro aqui -> " + err); }	
	
	console.log("Connected to 'ArquitetaWeb MocksApi' database");
	
	if (stringConexao == "localhost") {		
		console.log("MONGO Authorized");
		db.collection('mesas', {safe:true}, function(err, collection) {
			if (err) {
				console.log(err);
				console.log("The 'mesas' collection doesn't exist. Creating data...");
				populateMesa();
			}
		});	
	} else {	
		db.authenticate("arquitetaweb", "arqw3b", {}, function(err,success){
			if (err) {
				console.warn("MONGO ERROR: unauthorized "+ err.message);
			} else {
				console.log("MONGO Authorized");
				verifyTables();				
			}
		});
	}	
});

exports.clear = function(req, res) {
	console.log('Schedule');
	db.collection('mesas', function(err, collection) {	
		collection.update({}, {$set: { Situacao: "1" }}, {safe:true, multi:true}, function(err, result) {
			if (err) {
				console.log('Error updating mesa: ' + err);
				res.send({'error':'An error has occurred'});
			} else {						
				db.collection('consumomesa', function(err, collection) {
					collection.drop(function(err, result) {			
						if (err) {
							console.log('Error drop mesa: ' + err);
							res.send({'error':'An error has occurred'});
						} else {
							console.log('' + result + ' document(s) updated');
							res.send({'sucess':'document(s) updated, sucess!'});
						}
					});
				});				
			}
		});
	});
};

exports.recriar = function(req, res) {
	db.collection('mesas').drop();
	//verifyTables();
	res.send({'sucess':'drop(s) sucess!'});
};



exports.findById = function(req, res) {
	var id = req.param("id");
	console.log('Retrieving mesa: ' + id);
	db.collection('mesas', function(err, collection) {
		collection.findOne({'Id': parseInt(id)}, function(err, item) {
			res.send("Item ---> " + item.Id);
			console.log('Item ---> ' + item.NumeroMesa);
			console.log('err ---> ' + err);
		});
	});
};
	
exports.findRaiz = function(req, res) {
    res.send([{name:'Mock'}, {name:'Mock2'}, {name:'Mock3'}]);
};

exports.atualizarmesa = function(req, res) {
	var id = req.param("id");
	var situacao = req.param("situacao");	
	console.log('Updating mesa: ' + id + ' for situation ' + situacao);
	db.collection('mesas', function(err, collection) {	
		collection.update({ Id: parseInt(id) }, {$set: { Situacao: situacao }}, {safe:true}, function(err, result) {
			if (err) {
				console.log('Error updating mesa: ' + err);
				res.send({'error':'An error has occurred'});
			} else {
				console.log('' + result + ' document(s) updated');
				res.send(result);
			}
		});
	});
};

exports.addconsumomesa = function(req, res) {
	var consumoObject = req.body;
	var consumoStr =  JSON.stringify(consumoObject);
	console.log('Consumo: ' +consumoStr);
	
	db.collection('consumomesa', function(err, collection) {
		if (consumoStr == "{}") {
			res.status(500);
			url = req.url;
			console.log('Error insert consumomesa: object invalid retry');
			res.send({'error': 'Invalid object.'});
			return;
		}
		
		if (err) {
			console.log('Error insert consumomesa: ' + err);
			res.send({'error': 'An error has occurred'});
		} else {		
			collection.insert(consumoObject, function (err, inserted) {
				if (err) {
					console.log('Error insert consumomesa: ' + err);
					res.send({'error': 'An error has occurred'});
				} else {
					console.log('Sucess inserted consumomesa: ' + inserted);
					res.send(inserted);					
				}		
			});	
		}
	});
};

exports.getconsumomesa = function(req, res) {
	var idmesa = req.param("idmesa");
	console.log('Retrieving consumo mesa: ' + idmesa);
	db.collection('consumomesa', function(err, collection) {
		collection.find({'MesaId': parseInt(idmesa)}).toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.mesas = function(req, res) {
	db.collection('mesas', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.garcom = function(req, res) {
	db.collection('garcom', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.produtogrupo = function(req, res) {
	db.collection('produtogrupo', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

exports.produto = function(req, res) {
	db.collection('produto', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

verifyTables = function() {
	db.collection('mesas', {safe:true}, function(err, collection) {
		if (err) {
			console.log(err);
			console.log("The 'mesas' collection doesn't exist. Creating data...");
			populateMesa(); 
		}
	});
	
	db.collection('garcom', {safe:true}, function(err, collection) {
		if (err) {
			console.log(err);
			console.log("The 'garcom' collection doesn't exist. Creating data...");
			populateGarcom();
		}
	});
	
	db.collection('produtogrupo', {safe:true}, function(err, collection) {
		if (err) {
			console.log(err);
			console.log("The 'produtogrupo' collection doesn't exist. Creating data...");
			populateProdutoGrupo();
		}
	});
	
	db.collection('produto', {safe:true}, function(err, collection) {
		if (err) {
			console.log(err);
			console.log("The 'produto' collection doesn't exist. Creating data...");
			populateProduto();
		}
	});
	
	db.collection('consumomesa', {safe:true}, function(err, collection) {
		if (err) {
			console.log(err);
			console.log("The 'consumo mesa' collection doesn't exist. Creating data...");
			populateConsumoMesa();
		}
	});	
};

var populateMesa = function() {
	console.log("populando mesas");
	
    db.collection('mesas', function(err, collection) {
		console.log("inserindo mesas");
        collection.insert(mesa.data(), {safe:true}, function(err, result) {});
    });
};

var populateGarcom = function() {
	console.log("populando garcom");    
	
	db.collection('garcom', function(err, collection) {
		console.log("inserindo garcom");
		collection.insert(garcom.data(), {safe:true}, function(err, result) {});
    });	
};

var populateProdutoGrupo = function() {
	console.log("populando produtogrupo");    
	
	db.collection('produtogrupo', function(err, collection) {
		console.log("inserindo produtogrupo");
		collection.insert(produtogrupo.data(), {safe:true}, function(err, result) {});
    });
};

var populateProduto = function() {
	console.log("populando produto");    

	db.collection('produto', function(err, collection) {
		console.log("inserindo produto");
		collection.insert(produto.data(), {safe:true}, function(err, result) {});
    });	
};


var populateConsumoMesa = function() {
	console.log("populando consumomesa");    
	
	db.collection('consumomesa', function(err, collection) {
		console.log("inserindo consumomesa");
		collection.insert(consumomesa.data(), {safe:true}, function(err, result) {});
    });
};