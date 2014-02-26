var express = require('express'),
    api = require('./routes/callsApi');
 
var app = express();

app.get('/', api.findRaiz); 
app.get('/api/atualizarmesa?id=:id&situacao=:situacao', api.findById); // Api/AtualizarMesa?id=" + mesa + "&situacao=" + codigo
app.get('/api/situacaomesas', api.situacaomesas);
 
app.listen(process.env.PORT || 5000);
console.log('Listening on port 5000...');
