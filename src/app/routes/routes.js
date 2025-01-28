const express = require('express');
const PromocaoController = require('../controllers/PromocaoController');
const ComboPromocaoController = require('../controllers/ComboPromocaoController');
const ClienteController = require('../controllers/ClienteController');
const MunicipioController = require('../controllers/MunicipioController');
const ItemController = require('../controllers/ItemController');
const ItemVendaController = require('../controllers/ItemVendaController');
const TipoRecebimentoController = require('../controllers/TipoRecebimentoController');
const FormaPagamentoController = require('../controllers/FormaPagamentoController');
const CategoriaController = require('../controllers/CategoriaController');
const TipoOperacaoController = require('../controllers/TipoOperacaoController');
const RecebimentoVendaController = require('../controllers/RecebimentoVendaController');
const VendaController = require('../controllers/VendaController')
const UsuarioController = require('../controllers/UsuarioController')
const UnidadeMedidaController = require('../controllers/UnidadeMedicaController')

const router = express.Router();

// Rotas para Promoção
router.get('/promocoes', PromocaoController.listar);
router.post('/promocoes', PromocaoController.criar);
router.get('/promocoes/:id', PromocaoController.buscarPorId);
router.put('/promocoes/:id', PromocaoController.atualizar);
router.delete('/promocoes/:id', PromocaoController.deletar);

// Rotas para Combo Promoção
router.get('/combo-promocoes', ComboPromocaoController.listar);
router.post('/combo-promocoes', ComboPromocaoController.criar);
router.get('/combo-promocoes/:id', ComboPromocaoController.buscarPorId);
router.put('/combo-promocoes/:id', ComboPromocaoController.atualizar);
router.delete('/combo-promocoes/:id', ComboPromocaoController.deletar);

// Rotas para Cliente
router.get('/clientes', ClienteController.listar);
router.post('/clientes', ClienteController.criar);
router.get('/clientes/:id', ClienteController.buscarPorId);
router.put('/clientes/:id', ClienteController.atualizar);
router.delete('/clientes/:id', ClienteController.deletar);

// Rotas para Município
router.get('/municipios', MunicipioController.listar);
router.post('/municipios', MunicipioController.criar);
router.get('/municipios/:id', MunicipioController.buscarPorId);
router.put('/municipios/:id', MunicipioController.atualizar);
router.delete('/municipios/:id', MunicipioController.deletar);

// Rotas para Item

router.get('/itens', ItemController.listar);
router.get('/itens/:id', ItemController.buscarPorId);
router.post('/itens', ItemController.criar);
router.put('/itens/:id', ItemController.atualizar);
router.delete('/itens/:id', ItemController.deletar);

// Rotas para venda

router.get('/vendas', VendaController.listar);
router.get('/vendas/:id', VendaController.buscarPorId);
router.get('/vendas/cliente/:clienteId', VendaController.buscarPorCliente);
router.post('/vendas', VendaController.criar);
router.put('/vendas/:id', VendaController.atualizar);
router.delete('/vendas/:id', VendaController.deletar);

// Rotas para Usuario

router.get('/usuarios', UsuarioController.index);
router.get('/usuarios/:id', UsuarioController.show);
router.post('/usuarios', UsuarioController.store);
router.put('/usuarios/:id', UsuarioController.update);
router.delete('/usuarios/:id', UsuarioController.destroy);

// Rotas para ItemVenda
router.get('/item-vendas', ItemVendaController.index);
router.get('/item-vendas/:id', ItemVendaController.show);
router.post('/item-vendas', ItemVendaController.store);
router.put('/item-vendas/:id', ItemVendaController.update);
router.delete('/item-vendas/:id', ItemVendaController.destroy);

// Rotas para tipos-recebimento

router.get('/tipos-recebimento', TipoRecebimentoController.index);
router.get('/tipos-recebimento/:id', TipoRecebimentoController.show);
router.post('/tipos-recebimento', TipoRecebimentoController.store);
router.put('/tipos-recebimento/:id', TipoRecebimentoController.update);
router.delete('/tipos-recebimento/:id', TipoRecebimentoController.destroy);

// Rotas para formas-pagamento

router.get('/formas-pagamento', FormaPagamentoController.index);
router.get('/formas-pagamento/:id', FormaPagamentoController.show);
router.post('/formas-pagamento', FormaPagamentoController.store);
router.put('/formas-pagamento/:id', FormaPagamentoController.update);
router.delete('/formas-pagamento/:id', FormaPagamentoController.destroy);

// Rotas recebimentos-venda

router.get('/recebimentos-venda', RecebimentoVendaController.index);
router.get('/recebimentos-venda/:id', RecebimentoVendaController.show);
router.post('/recebimentos-venda', RecebimentoVendaController.store);
router.put('/recebimentos-venda/:id', RecebimentoVendaController.update);
router.delete('/recebimentos-venda/:id', RecebimentoVendaController.destroy);

// Rotas para

router.get('/tipo-operacoes', TipoOperacaoController.index);
router.get('/tipo-operacoes/:id', TipoOperacaoController.show);
router.post('/tipo-operacoes', TipoOperacaoController.store);
router.put('/tipo-operacoes/:id', TipoOperacaoController.update);
router.delete('/tipo-operacoes/:id', TipoOperacaoController.destroy);

// Rotas para categorias

router.get('/categorias', CategoriaController.index);
router.get('/categorias/:id', CategoriaController.show);
router.post('/categorias', CategoriaController.store);
router.put('/categorias/:id', CategoriaController.update);
router.delete('/categorias/:id', CategoriaController.destroy);

// rotas para UnidadeMedida

router.get('/unidades-medida', UnidadeMedidaController.index);
router.get('/unidades-medida/:id', UnidadeMedidaController.show);
router.post('/unidades-medida', UnidadeMedidaController.store);
router.put('/unidades-medida/:id', UnidadeMedidaController.update);
router.delete('/unidades-medida/:id', UnidadeMedidaController.destroy);

module.exports = router;
