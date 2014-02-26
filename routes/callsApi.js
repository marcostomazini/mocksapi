var mongo = require('mongodb');


var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
	ObjectID = mongo.ObjectID;

var stringConexao = "ds045628.mongolab.com";
var portaConexao = 45628;

//var server = new Server('ds045628.mongolab.com', 45628, {auto_reconnect: true});	
var server = new Server(stringConexao, portaConexao, {auto_reconnect: true});	
db = new Db('heroku_app18216567', server, {safe: true});	

db.open(function(err, db) {
	console.log("tentando abrir conect");
	if(err) { return console.log("erro aqui -> " + err); }	
	
	console.log("Connected to 'winedb' database");
	
	if (stringConexao == "localhost") {		
		console.log("MONGO Authorized");
		db.collection('mesas', {safe:true}, function(err, collection) {
			if (err) {
				console.log(err);
				console.log("The 'mesas' collection doesn't exist. Creating it with sample data...");
				populateDB();
			}
		});	
	} else {	
		db.authenticate("arquitetaweb", "arqw3b", {}, function(err,success){
			if (err) {
			 console.warn("MONGO ERROR: unauthorized "+ err.message);
			} else {
			 console.log("MONGO Authorized");
			db.collection('mesas', {safe:true}, function(err, collection) {
				if (err) {
					console.log(err);
					console.log("The 'mesas' collection doesn't exist. Creating it with sample data...");
					populateDB();
				}
			});				
			}
		});
	}
	
});
	
exports.findRaiz = function(req, res) {
    res.send([{name:'Mock'}, {name:'Mock2'}, {name:'Mock3'}]);
};

exports.findById = function(req, res) {
    res.send({id:req.params.id, situacao: req.params.situacao });
};

exports.situacaomesas = function(req, res) {
	db.collection('mesas', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
};

var populateDB = function() {
	console.log("populando db");
    var mesas = [
    {Id: 0, NumeroMesa: '1', Situacao: '1'},
	{Id: 1, NumeroMesa: '2', Situacao: '2'},
	{Id: 2, NumeroMesa: '3', Situacao: '1'},
	{Id: 3, NumeroMesa: '4', Situacao: '8'},
	{Id: 4, NumeroMesa: '4A', Situacao: '1'},
	{Id: 5, NumeroMesa: '5', Situacao: '2'},
	{Id: 6, NumeroMesa: '6', Situacao: '1'},
	{Id: 7, NumeroMesa: '7', Situacao: '2'},
	{Id: 8, NumeroMesa: '8', Situacao: '1'},
	{Id: 9, NumeroMesa: '9', Situacao: '2'},
	{Id: 10, NumeroMesa: '10', Situacao: '2'},
	{Id: 11, NumeroMesa: '11', Situacao: '1'},
	{Id: 12, NumeroMesa: '12', Situacao: '2'},
	{Id: 13, NumeroMesa: '13', Situacao: '1'},
	{Id: 14, NumeroMesa: '14', Situacao: '2'},
	{Id: 15, NumeroMesa: '15', Situacao: '2'},
	{Id: 16, NumeroMesa: '16', Situacao: '1'},
	{Id: 17, NumeroMesa: '17', Situacao: '2'},
	{Id: 18, NumeroMesa: '18', Situacao: '8'},
	{Id: 19, NumeroMesa: '19', Situacao: '2'},	
	{Id: 20, NumeroMesa: '20', Situacao: '2'},
	{Id: 21, NumeroMesa: '21', Situacao: '1'},
	{Id: 22, NumeroMesa: '22', Situacao: '2'},
	{Id: 23, NumeroMesa: '23', Situacao: '1'},
	{Id: 24, NumeroMesa: '24', Situacao: '2'},
	{Id: 25, NumeroMesa: '25', Situacao: '2'},
	{Id: 26, NumeroMesa: '26', Situacao: '1'},
	{Id: 27, NumeroMesa: '27', Situacao: '2'},
	{Id: 28, NumeroMesa: '28', Situacao: '1'},
	{Id: 29, NumeroMesa: '29', Situacao: '2'},
	{Id: 30, NumeroMesa: '30', Situacao: '1'},
	{Id: 31, NumeroMesa: '31', Situacao: '1'},
	{Id: 32, NumeroMesa: '32', Situacao: '1'},
	{Id: 33, NumeroMesa: '33', Situacao: '8'},
	{Id: 34, NumeroMesa: '34', Situacao: '1'},
	{Id: 35, NumeroMesa: '35', Situacao: '1'},
	{Id: 36, NumeroMesa: '36', Situacao: '2'},
	{Id: 37, NumeroMesa: '37', Situacao: '1'},
	{Id: 38, NumeroMesa: '38', Situacao: '2'},
	{Id: 39, NumeroMesa: '39', Situacao: '1'},
	{Id: 40, NumeroMesa: '40', Situacao: '2'},
	{Id: 41, NumeroMesa: '41', Situacao: '2'},
	{Id: 42, NumeroMesa: '42', Situacao: '1'},
	{Id: 43, NumeroMesa: '43', Situacao: '2'},
	{Id: 44, NumeroMesa: '44', Situacao: '1'},
	{Id: 45, NumeroMesa: '45', Situacao: '2'},
	{Id: 46, NumeroMesa: '46', Situacao: '2'},
	{Id: 47, NumeroMesa: '47', Situacao: '1'},
	{Id: 48, NumeroMesa: '48', Situacao: '2'},
	{Id: 49, NumeroMesa: '49', Situacao: '8'},	
	{Id: 50, NumeroMesa: '50', Situacao: '2'},
	{Id: 51, NumeroMesa: '51', Situacao: '2'},
	{Id: 52, NumeroMesa: '52', Situacao: '1'},
	{Id: 53, NumeroMesa: '53', Situacao: '2'},
	{Id: 54, NumeroMesa: '54', Situacao: '1'},
	{Id: 55, NumeroMesa: '55', Situacao: '2'},
	{Id: 56, NumeroMesa: '56', Situacao: '1'},
	{Id: 57, NumeroMesa: '57', Situacao: '1'},
	{Id: 58, NumeroMesa: '58', Situacao: '1'},
	{Id: 59, NumeroMesa: '59', Situacao: '1'},
	{Id: 60, NumeroMesa: '60', Situacao: '2'},
	{Id: 61, NumeroMesa: '61', Situacao: '1'},
	{Id: 62, NumeroMesa: '62', Situacao: '2'},
	{Id: 63, NumeroMesa: '63', Situacao: '8'},
	{Id: 64, NumeroMesa: '64', Situacao: '2'},
	{Id: 65, NumeroMesa: '65', Situacao: '2'},
	{Id: 66, NumeroMesa: '66', Situacao: '1'},
	{Id: 67, NumeroMesa: '67', Situacao: '2'},
	{Id: 68, NumeroMesa: '68', Situacao: '1'},
	{Id: 69, NumeroMesa: '69', Situacao: '2'},
	{Id: 70, NumeroMesa: '70', Situacao: '2'},
	{Id: 71, NumeroMesa: '71', Situacao: '1'},
	{Id: 72, NumeroMesa: '72', Situacao: '2'},
	{Id: 73, NumeroMesa: '73', Situacao: '1'},
	{Id: 74, NumeroMesa: '74', Situacao: '2'},
	{Id: 75, NumeroMesa: '75', Situacao: '2'},
	{Id: 76, NumeroMesa: '76', Situacao: '1'},
	{Id: 77, NumeroMesa: '77', Situacao: '1'},
	{Id: 78, NumeroMesa: '78', Situacao: '1'},
	{Id: 79, NumeroMesa: '79', Situacao: '8'},
	{Id: 80, NumeroMesa: '80', Situacao: '1'},
	{Id: 81, NumeroMesa: '81', Situacao: '2'},
	{Id: 82, NumeroMesa: '82', Situacao: '1'},
	{Id: 83, NumeroMesa: '83', Situacao: '2'},
	{Id: 84, NumeroMesa: '84', Situacao: '2'},
	{Id: 85, NumeroMesa: '85', Situacao: '1'},
	{Id: 86, NumeroMesa: '86', Situacao: '2'},
	{Id: 87, NumeroMesa: '87', Situacao: '1'},
	{Id: 88, NumeroMesa: '88', Situacao: '2'},
	{Id: 89, NumeroMesa: '89', Situacao: '2'},
	{Id: 90, NumeroMesa: '90', Situacao: '1'},
	{Id: 91, NumeroMesa: '91', Situacao: '2'},
	{Id: 92, NumeroMesa: '92', Situacao: '1'},
	{Id: 93, NumeroMesa: '93', Situacao: '2'},
	{Id: 94, NumeroMesa: '94', Situacao: '2'},
	{Id: 95, NumeroMesa: '95', Situacao: '8'},
	{Id: 96, NumeroMesa: '96', Situacao: '1'},
	{Id: 97, NumeroMesa: '97', Situacao: '1'},
	{Id: 98, NumeroMesa: '98', Situacao: '1'},
	{Id: 99, NumeroMesa: '99', Situacao: '1'},	
	{Id: 100, NumeroMesa: '100', Situacao: '1'},
	{Id: 101, NumeroMesa: '101', Situacao: '1'},
	{Id: 102, NumeroMesa: '102', Situacao: '1'},
	{Id: 103, NumeroMesa: '103', Situacao: '1'},
	{Id: 104, NumeroMesa: '104', Situacao: '1'},
	{Id: 105, NumeroMesa: '105', Situacao: '1'},
	{Id: 106, NumeroMesa: '106', Situacao: '1'},	
	{Id: 107, NumeroMesa: '107', Situacao: '1'},
	{Id: 108, NumeroMesa: '108', Situacao: '2'},
	{Id: 109, NumeroMesa: '109', Situacao: '1'},
	{Id: 110, NumeroMesa: '110', Situacao: '2'},	
	{Id: 111, NumeroMesa: '111', Situacao: '1'},
	{Id: 112, NumeroMesa: '112', Situacao: '8'},
	{Id: 113, NumeroMesa: '113', Situacao: '2'},
	{Id: 114, NumeroMesa: '114', Situacao: '1'},
	{Id: 115, NumeroMesa: '115', Situacao: '2'},
	{Id: 116, NumeroMesa: '116', Situacao: '1'},	
	{Id: 117, NumeroMesa: '117', Situacao: '2'},
	{Id: 118, NumeroMesa: '118', Situacao: '2'},
	{Id: 119, NumeroMesa: '119', Situacao: '1'},
	{Id: 120, NumeroMesa: '120', Situacao: '2'},
	{Id: 121, NumeroMesa: '121', Situacao: '1'},
	{Id: 122, NumeroMesa: '122', Situacao: '2'},
	{Id: 123, NumeroMesa: '123', Situacao: '2'},
	{Id: 124, NumeroMesa: '124', Situacao: '1'},
	{Id: 125, NumeroMesa: '125', Situacao: '2'},
	{Id: 126, NumeroMesa: '126', Situacao: '1'},	
	{Id: 127, NumeroMesa: '127', Situacao: '8'},
	{Id: 128, NumeroMesa: '128', Situacao: '1'},
	{Id: 129, NumeroMesa: '129', Situacao: '1'},
	{Id: 130, NumeroMesa: '130', Situacao: '2'},
	{Id: 131, NumeroMesa: '131', Situacao: '1'},
	{Id: 132, NumeroMesa: '132', Situacao: '2'},
	{Id: 133, NumeroMesa: '133', Situacao: '1'},
	{Id: 134, NumeroMesa: '134', Situacao: '2'},
	{Id: 135, NumeroMesa: '135', Situacao: '2'},
	{Id: 136, NumeroMesa: '136', Situacao: '1'},
	{Id: 137, NumeroMesa: '137', Situacao: '2'},
	{Id: 138, NumeroMesa: '138', Situacao: '1'},
	{Id: 139, NumeroMesa: '139', Situacao: '2'},
	{Id: 140, NumeroMesa: '140', Situacao: '2'},
	{Id: 141, NumeroMesa: '141', Situacao: '1'},
	{Id: 142, NumeroMesa: '142', Situacao: '2'},
	{Id: 143, NumeroMesa: '143', Situacao: '1'},
	{Id: 144, NumeroMesa: '144', Situacao: '2'},
	{Id: 145, NumeroMesa: '145', Situacao: '2'},
	{Id: 146, NumeroMesa: '146', Situacao: '1'},	
	{Id: 147, NumeroMesa: '147', Situacao: '8'},
	{Id: 148, NumeroMesa: '148', Situacao: '1'},
	{Id: 149, NumeroMesa: '149', Situacao: '1'},
	{Id: 150, NumeroMesa: '150', Situacao: '1'},
	{Id: 151, NumeroMesa: '151', Situacao: '1'},
	{Id: 152, NumeroMesa: '152', Situacao: '1'},
	{Id: 153, NumeroMesa: '153', Situacao: '1'},
	{Id: 154, NumeroMesa: '154', Situacao: '1'},
	{Id: 155, NumeroMesa: '155', Situacao: '1'},
	{Id: 156, NumeroMesa: '156', Situacao: '1'},	
	{Id: 157, NumeroMesa: '157', Situacao: '1'},
	{Id: 158, NumeroMesa: '158', Situacao: '1'},
	{Id: 159, NumeroMesa: '159', Situacao: '1'},
	{Id: 160, NumeroMesa: '160', Situacao: '1'},
	{Id: 161, NumeroMesa: '161', Situacao: '1'},
	{Id: 162, NumeroMesa: '162', Situacao: '1'},
	{Id: 163, NumeroMesa: '163', Situacao: '1'},
	{Id: 164, NumeroMesa: '164', Situacao: '2'},
	{Id: 165, NumeroMesa: '165', Situacao: '1'},
	{Id: 166, NumeroMesa: '166', Situacao: '8'},	
	{Id: 167, NumeroMesa: '167', Situacao: '1'},
	{Id: 168, NumeroMesa: '168', Situacao: '2'},
	{Id: 169, NumeroMesa: '169', Situacao: '2'},
	{Id: 170, NumeroMesa: '170', Situacao: '1'},
	{Id: 171, NumeroMesa: '171', Situacao: '2'},
	{Id: 172, NumeroMesa: '172', Situacao: '1'},
	{Id: 173, NumeroMesa: '173', Situacao: '2'},
	{Id: 174, NumeroMesa: '174', Situacao: '2'},
	{Id: 175, NumeroMesa: '175', Situacao: '1'},
	{Id: 176, NumeroMesa: '176', Situacao: '2'},	
	{Id: 177, NumeroMesa: '177', Situacao: '1'},
	{Id: 178, NumeroMesa: '178', Situacao: '2'},
	{Id: 179, NumeroMesa: '179', Situacao: '2'},
	{Id: 180, NumeroMesa: '180', Situacao: '1'},
	{Id: 181, NumeroMesa: '181', Situacao: '2'},
	{Id: 182, NumeroMesa: '182', Situacao: '1'},
	{Id: 183, NumeroMesa: '183', Situacao: '2'},
	{Id: 184, NumeroMesa: '184', Situacao: '2'},
	{Id: 185, NumeroMesa: '185', Situacao: '1'},
	{Id: 186, NumeroMesa: '186', Situacao: '2'},	
	{Id: 187, NumeroMesa: '187', Situacao: '1'},
	{Id: 188, NumeroMesa: '188', Situacao: '2'},
	{Id: 189, NumeroMesa: '189', Situacao: '2'},
	{Id: 190, NumeroMesa: '190', Situacao: '8'},	
	{Id: 191, NumeroMesa: '191', Situacao: '2'},
	{Id: 192, NumeroMesa: '192', Situacao: '1'},
	{Id: 193, NumeroMesa: '193', Situacao: '2'},
	{Id: 194, NumeroMesa: '194', Situacao: '2'},
	{Id: 195, NumeroMesa: '195', Situacao: '1'},
	{Id: 196, NumeroMesa: '196', Situacao: '2'},	
	{Id: 197, NumeroMesa: '197', Situacao: '1'},
	{Id: 198, NumeroMesa: '198', Situacao: '2'},
	{Id: 199, NumeroMesa: '199', Situacao: '2'},
	{Id: 200, NumeroMesa: '200', Situacao: '1'},
	{Id: 201, NumeroMesa: '201', Situacao: '2'},
	{Id: 202, NumeroMesa: '202', Situacao: '1'},
	{Id: 203, NumeroMesa: '203', Situacao: '2'},
	{Id: 204, NumeroMesa: '204', Situacao: '8'},	
	{Id: 205, NumeroMesa: '205', Situacao: '1'}];

    db.collection('mesas', function(err, collection) {
		console.log("inserindo");
        collection.insert(mesas, {safe:true}, function(err, result) {});
    });

};
