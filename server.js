var express = require('express'),
    api = require('./routes/callsApi');
 
var app = express();

app.get('/api/findById/:id', api.findById); // TESTE FIND ONE
app.get('/', api.findRaiz); 
app.get('/api/getmesas', api.mesas); // /api/getmesas
app.get('/api/getmesa/:idmesa', api.consumomesa); // /api/getmesa/ID_MESA --- FIND ITENS (not findOne) return list objects
app.get('/api/getproduto', api.produto); // /api/GetProduto
app.get('/api/getprodutogrupo', api.produtogrupo); // /api/GetProdutoGrupo
app.get('/api/getgarcom', api.garcom); // /api/GetGarcom

app.put('/api/atualizarmesa', api.atualizarmesa); // /api/atualizarmesa?id=1&situacao=2

app.get('/api/addconsumomesa/:idmesa', api.addconsumomesa);
app.post('/api/agendamento', api.clear);
 
app.listen(process.env.PORT || 5000);
console.log('Listening on port 5000...');
