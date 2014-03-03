var express = require('express'),
    api = require('./routes/callsApi');
 
var app = express();

app.get('/api/situacaomesa/:id', api.findById);
app.get('/', api.findRaiz); 
app.get('/api/situacaomesas', api.situacaomesas); // /api/situacaomesas
app.get('/api/getproduto', api.situacaomesas); // /api/GetProduto
app.get('/api/getprodutogrupo', api.situacaomesas); // /api/GetProdutoGrupo
app.get('/api/getgarcom', api.garcom); // /api/GetGarcom

app.put('/api/atualizarmesa', api.atualizarmesa); // /api/atualizarmesa?id=1&situacao=2
 
app.listen(process.env.PORT || 5000);
console.log('Listening on port 5000...');
