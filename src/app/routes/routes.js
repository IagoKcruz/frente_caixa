const express = require('express');
const PromocaoController = require('../controllers/helpers/PromocaoController');
const ComboPromocaoController = require('../controllers/helpers/ComboPromocaoController');
const ClienteController = require('../controllers/helpers/ClienteController');
const MunicipioController = require('../controllers/helpers/MunicipioController');
const ItemController = require('../controllers/helpers/ItemController');
const ItemVendaController = require('../controllers/helpers/ItemVendaController');
const TipoRecebimentoController = require('../controllers/helpers/TipoRecebimentoController');
const FormaPagamentoController = require('../controllers/helpers/FormaPagamentoController');
const VendaController = require('../controllers/helpers/VendaController')
const UsuarioController = require('../controllers/helpers/usuarioController')
const AuthController = require("../controllers/helpers/UserAuthController");    

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/login", AuthController.login);

router.use(authMiddleware);

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

module.exports = router;
