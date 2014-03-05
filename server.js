var express = require('express'),
    api = require('./routes/callsApi');
 
var app = express();

app.get('/api/getmesa/:id', api.findById);
app.get('/', api.findRaiz); 
app.get('/api/getmesas', api.mesas); // /api/situacaomesas
app.get('/api/getproduto', api.produto); // /api/GetProduto
app.get('/api/getprodutogrupo', api.produtogrupo); // /api/GetProdutoGrupo
app.get('/api/getgarcom', api.garcom); // /api/GetGarcom

app.put('/api/atualizarmesa', api.atualizarmesa); // /api/atualizarmesa?id=1&situacao=2
 
app.listen(process.env.PORT || 5000);
console.log('Listening on port 5000...');
