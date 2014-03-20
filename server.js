var express = require('express'),
	http = require('http'),
    api = require('./routes/callsApi');
 
var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    //app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    
	//app.use(express.bodyParser()); // deprecated
	
	app.use(express.json());
	app.use(express.urlencoded());

    //app.use(express.static(path.join(__dirname, 'public')));
});

// TESTES
app.get('/api/findById/:id', api.findById); // TESTE FIND ONE
app.get('/', api.findRaiz); 

// Mesas
app.get('/api/mesas', api.mesas); // Listagem das mesas

// Consumo da mesa
app.get('/api/mesa/conta/:idmesa', api.getfecharconta); // Pedir para fechar conta mesaid
app.get('/api/mesa/:idmesa', api.getconsumomesa); // Pega todo o consumo da mesaid
app.get('/api/mesa/:idmesa/:qtde', api.getconsumorecente); // Pega todo o consumo da mesaid / qtde = quantidade de registros a trazer
app.post('/api/mesa', api.addconsumomesa); // Adiciona itens a mesa via Json Object

// Sincronização
app.get('/api/produto', api.produto); // Listagem dos produtos
app.get('/api/produtogrupo', api.produtogrupo); // Listagem dos grupos de produto
app.get('/api/garcom', api.garcom); // Listagem dos garçons

app.put('/api/atualizarmesa', api.atualizarmesa); // /api/atualizarmesa?id=1&situacao=2 - via PUT URL

// Limpeza Automatica dos Dados
app.post('/api/agendamento', api.clear); // agendamento pra limpar as mesas e os consumos

app.get('/api/recriar', api.recriar); // recriar tabelas

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});