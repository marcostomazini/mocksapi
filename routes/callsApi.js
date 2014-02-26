exports.findRaiz = function(req, res) {
    res.send([{name:'Mock'}, {name:'Mock2'}, {name:'Mock3'}]);
};

exports.findById = function(req, res) {
    res.send({id:req.params.id, situacao: req.params.situacao });
};

exports.situacaomesas = function(req, res) {
    res.send([
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
	{Id: 10, NumeroMesa: '10', Situacao: '1'},
	{Id: 11, NumeroMesa: '11', Situacao: '1'}]);
};