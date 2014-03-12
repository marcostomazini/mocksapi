var mongo = require('mongodb');
exports.data = function(req, res) {
	return [{Id: 1, ProdutoGrupoId: 1, Codigo: '500', Descricao: 'Produto T1'},
			{Id: 2, ProdutoGrupoId: 1, Codigo: '501', Descricao: 'Produto T2'},
			{Id: 3, ProdutoGrupoId: 2, Codigo: '600', Descricao: 'Produto T3'},
			{Id: 4, ProdutoGrupoId: 2, Codigo: '601', Descricao: 'Produto T4'},	
			{Id: 5, ProdutoGrupoId: 3, Codigo: '701', Descricao: 'Produto T5'},
			{Id: 6, ProdutoGrupoId: 3, Codigo: '702', Descricao: 'Produto T6'},
			{Id: 7, ProdutoGrupoId: 3, Codigo: '703', Descricao: 'Produto T7'},
			{Id: 8, ProdutoGrupoId: 4, Codigo: '800', Descricao: 'Produto T8'},
			{Id: 9, ProdutoGrupoId: null, Codigo: '700', Descricao: 'Produto Sem Grupo Null'},
			{Id: 11, Codigo: '701', Descricao: 'Produto Sem Grupo Sem Enviar ProdutoGrupoId'},
			{Id: 10, ProdutoGrupoId: 1, Codigo: '502', Descricao: 'Produto 2'}];
};