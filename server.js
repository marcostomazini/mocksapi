var express = require('express'),
	http = require('http'),
    api = require('./routes/callsApi');
 
var app = express();


app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    //app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/api/findById/:id', api.findById); // TESTE FIND ONE
app.get('/', api.findRaiz); 
app.get('/api/mesas', api.mesas); // /api/getmesas
app.get('/api/mesa/:idmesa', api.consumomesa); // /api/getmesa/ID_MESA --- FIND ITENS (not findOne) return list objects
app.get('/api/produto', api.produto); // /api/GetProduto
app.get('/api/produtogrupo', api.produtogrupo); // /api/GetProdutoGrupo
app.get('/api/garcom', api.garcom); // /api/GetGarcom

app.put('/api/atualizarmesa', api.atualizarmesa); // /api/atualizarmesa?id=1&situacao=2

app.get('/api/consumomesa/:idmesa', api.getconsumomesa); // /api/getmesa/ID_MESA --- FIND ITENS (not findOne) return list objects
app.post('/api/consumomesa', api.addconsumomesa); // /api/addconsumomesa?mesaid=1&deviceid=2&produtoid=2&quantidade=1

app.post('/api/agendamento', api.clear); // agendamento pra limpar as mesas e os consumos

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});