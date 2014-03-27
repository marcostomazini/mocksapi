var mongo = require('mongodb');
var nodemailer = require("nodemailer");

var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure;	
	ObjectID = mongo.ObjectID;

var smtpTransport = nodemailer.createTransport("SMTP", {
    host: "mail.arquitetaweb.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: "tomazini@arquitetaweb.com",
        pass: "cint!4"
    }	
});

sendEmailToConfirmation = function(email) {
	var textLink = "http://arquitetaweb.com";	
	var mailOptions = {
        from: "AComanda <tomazini@arquitetaweb.com>", // sender address
        to: email, // list of receivers
		bcc: "marcos.tomazini@gmail.com",
        subject: "AComanda - ArquitetaWeb Instalação", 
        html: '<b>Signup Confirmation ?</b><br />'
				+ 'Your email account is : ' + email + '<br />'
				+ '<a href=\"'+ textLink.toString() + '\">Click here to activate your account.</a>'
				+ '<br />' 
				+ '<br /> Text link: ' + textLink
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}

// DATA OBJECT
var	produtogrupo = require('./data/produtogrupo');
	produto = require('./data/produto');
	garcom = require('./data/garcom');	
	mesa = require('./data/mesa');
	device = require('./data/device');
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
							res.send({'success':'document(s) updated, success!'});
						}
					});
				});				
			}
		});
	});
};

exports.recriar = function(req, res) {
	dropTables();
	verifyTables();
	res.send({'success':'recreate datatables success!'});
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
	console.log('MesaId: ' +consumoObject[0].MesaId);
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
					var idmesa = consumoObject[0].MesaId;
					db.collection('mesas', function(err, collection) {
						collection.update({ Id: parseInt(idmesa) }, {$set: { Situacao: '2' }}, {safe:true}, function(err, result) {
							if (err) {
								console.log('Error updating mesa: ' + err);
								res.send({'error':'An error has occurred'});
							} else {
								var success = 'affected: ' + result + ' :: idmesa: '+ idmesa + ((result > 0) ? ' - success' : ' - error. opss...!');
								console.log(success);
								res.send(success);
							}
						});
					});
					console.log('success inserted consumomesa: ' + inserted);
					res.send(inserted);					
				}		
			});	
		}
	});
};

exports.getfecharconta = function(req, res) {
	var idmesa = req.param("idmesa");
	console.log('Retrieving fechar mesa: ' + idmesa);
	db.collection('mesas', function(err, collection) {
		collection.update({ Id: parseInt(idmesa) }, {$set: { Situacao: '3' }}, {safe:true}, function(err, result) {
			if (err) {
				console.log('Error updating mesa: ' + err);
				res.send({'error':'An error has occurred'});
			} else {
				var success = 'affected: ' + result + ' :: idmesa: '+ idmesa + ((result > 0) ? ' - success' : ' - error. opss...!');
				console.log(success);
				res.send(success);
			}
		});
	});
	/*db.collection('consumomesa', function(err, collection) {
		collection.remove({'MesaId': parseInt(idmesa)}, function(err, items) {
			if (err) {
				console.log('Error fechar mesa: ' + err);
				res.send({'error':'An error has occurred'});
			} else {
				db.collection('mesas', function(err, collection) {
					collection.update({ Id: parseInt(idmesa) }, {$set: { Situacao: '3' }}, {safe:true}, function(err, result) {
						if (err) {
							console.log('Error updating mesa: ' + err);
							res.send({'error':'An error has occurred'});
						} else {
							var sucess = 'affected: ' + result + ' :: idmesa: '+ idmesa + ((result > 0) ? ' - sucess' : ' - error. opss...!');
							console.log(sucess);
							res.send(sucess);
						}
					});
				});
			}
		});		
	});*/
};

exports.device = function(req, res) {
	var objectDevice = req.body;	

	var email = objectDevice.Nome;
	var deviceID = objectDevice.DeviceID;
	console.log('Retrieving email: ' + email);
	console.log('Retrieving deviceID: ' + deviceID);
	
	db.collection('device', function(err, collection) {
		collection.findOne({'Nome': email, 'DeviceID': deviceID}, function(err, item) {
			if (item != null) {
				if (item.Verificado) {
					console.log('user authorized');
					res.send({'success': "user authorized"});
				} else {
					console.log('user not authorized');
					res.send(500, {'error': "user not authorized"});
				}
			} else {			
				objectDevice.Verificado = false;
				collection.insert(objectDevice, function (err, inserted) {
					if (err) {
						console.log('error insert device: ' + err);
						res.send(500, {'error': 'an error has occurred'});
					} else {				
						sendEmailToConfirmation(inserted[0].Nome);
						console.log('success inserted device - Nome: ' + inserted[0].Nome +  ' DeviceID: ' +inserted[0].DeviceID );
						res.send({'success': "user inserted, sent an email confirmation to " + inserted[0].Nome });
					}		
				});	
			}
		});
	});	
};

exports.getconsumorecente = function(req, res) {
	var idmesa = req.param("idmesa");
	var qtdeRegistros = req.param("qtde");
	console.log('Retrieving consumo mesa: ' + idmesa);
	console.log('Retrieving consumo qtde: ' + qtdeRegistros);
	db.collection('consumomesa', function(err, collection) {
		collection.find({'MesaId': parseInt(idmesa)}).sort({DataHoraPedido: -1}).limit(parseInt(qtdeRegistros)).toArray(function(err, items) {		
			res.send(items);
		});
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

dropTables = function() {
	db.collection('mesas').drop();
	db.collection('garcom').drop();
	db.collection('produtogrupo').drop();
	db.collection('produto').drop();
	db.collection('consumomesa').drop();
	db.collection('device').drop();
}

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
	
	db.collection('device', {safe:true}, function(err, collection) {
		if (err) {
			console.log(err);
			console.log("The 'device' collection doesn't exist. Creating data...");
			populateDevice();
		}
	});
};

populateMesa = function() {
	console.log("populando mesas");
	
    db.collection('mesas', function(err, collection) {
		console.log("inserindo mesas");
        collection.insert(mesa.data(), {safe:true}, function(err, result) {});
    });
};

populateGarcom = function() {
	console.log("populando garcom");    
	
	db.collection('garcom', function(err, collection) {
		console.log("inserindo garcom");
		collection.insert(garcom.data(), {safe:true}, function(err, result) {});
    });	
};

populateProdutoGrupo = function() {
	console.log("populando produtogrupo");    
	
	db.collection('produtogrupo', function(err, collection) {
		console.log("inserindo produtogrupo");
		collection.insert(produtogrupo.data(), {safe:true}, function(err, result) {});
    });
};

populateProduto = function() {
	console.log("populando produto");    

	db.collection('produto', function(err, collection) {
		console.log("inserindo produto");
		collection.insert(produto.data(), {safe:true}, function(err, result) {});
    });	
};

populateConsumoMesa = function() {
	console.log("populando consumomesa");    
	
	db.collection('consumomesa', function(err, collection) {
		console.log("inserindo consumomesa");
		collection.insert(consumomesa.data(), {safe:true}, function(err, result) {});
    });
};

populateDevice = function() {
	console.log("populando device");    
	
	db.collection('device', function(err, collection) {
		console.log("inserindo device");
		collection.insert(device.data(), {safe:true}, function(err, result) {});
    });
};