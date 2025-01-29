const express = require('express');
const PromocaoController = require('../controllers/PromocaoController');
const ComboPromocaoController = require('../controllers/ComboPromocaoController');
const ClienteController = require('../controllers/ClienteController');
const MunicipioController = require('../controllers/MunicipioController');
const ItemController = require('../controllers/ItemController');
const ItemVendaController = require('../controllers/ItemVendaController');
const TipoRecebimentoController = require('../controllers/TipoRecebimentoController');
const FormaPagamentoController = require('../controllers/FormaPagamentoController');
const VendaController = require('../controllers/VendaController')
const UsuarioController = require('../controllers/usuarioController')
const AuthController = require("../controllers/UserAuthController");    

const authMiddleware = require("../middlewares/auth");


const router = express.Router();

routes.post("/login", AuthController.login);

// Rotas para Promoção
router.get('/promocoes', authMiddleware, PromocaoController.listar);
router.post('/promocoes', authMiddleware, PromocaoController.criar);
router.get('/promocoes/:id', authMiddleware, PromocaoController.buscarPorId);
router.put('/promocoes/:id', authMiddleware, PromocaoController.atualizar);
router.delete('/promocoes/:id', authMiddleware, PromocaoController.deletar);

// Rotas para Combo Promoção
router.get('/combo-promocoes', authMiddleware, ComboPromocaoController.listar);
router.post('/combo-promocoes', authMiddleware, ComboPromocaoController.criar);
router.get('/combo-promocoes/:id', authMiddleware, ComboPromocaoController.buscarPorId);
router.put('/combo-promocoes/:id', authMiddleware, ComboPromocaoController.atualizar);
router.delete('/combo-promocoes/:id',authMiddleware,  ComboPromocaoController.deletar);

// Rotas para Cliente
router.get('/clientes', authMiddleware, ClienteController.listar);
router.post('/clientes', authMiddleware, ClienteController.criar);
router.get('/clientes/:id', authMiddleware, ClienteController.buscarPorId);
router.put('/clientes/:id', authMiddleware, ClienteController.atualizar);
router.delete('/clientes/:id', authMiddleware, ClienteController.deletar);

// Rotas para Município
router.get('/municipios', authMiddleware, MunicipioController.listar);
router.post('/municipios', authMiddleware, MunicipioController.criar);
router.get('/municipios/:id', authMiddleware, MunicipioController.buscarPorId);
router.put('/municipios/:id', authMiddleware, MunicipioController.atualizar);
router.delete('/municipios/:id', authMiddleware, MunicipioController.deletar);

// Rotas para Item

router.get('/itens', authMiddleware, ItemController.listar);
router.get('/itens/:id', authMiddleware, ItemController.buscarPorId);
router.post('/itens', authMiddleware, ItemController.criar);
router.put('/itens/:id', authMiddleware, ItemController.atualizar);
router.delete('/itens/:id', authMiddleware, ItemController.deletar);

// Rotas para venda

router.get('/vendas', authMiddleware, VendaController.listar);
router.get('/vendas/:id', authMiddleware, VendaController.buscarPorId);
router.get('/vendas/cliente/:clienteId', authMiddleware, VendaController.buscarPorCliente);
router.post('/vendas', authMiddleware, VendaController.criar);
router.put('/vendas/:id', authMiddleware, VendaController.atualizar);
router.delete('/vendas/:id', authMiddleware, VendaController.deletar);

// Rotas para Usuario

router.get('/usuarios', authMiddleware, UsuarioController.index);
router.get('/usuarios/:id', authMiddleware, UsuarioController.show);
router.post('/usuarios', authMiddleware, UsuarioController.store);
router.put('/usuarios/:id', authMiddleware, UsuarioController.update);
router.delete('/usuarios/:id', authMiddleware, UsuarioController.destroy);

// Rotas para ItemVenda
router.get('/item-vendas', authMiddleware, ItemVendaController.index);
router.get('/item-vendas/:id', authMiddleware, ItemVendaController.show);
router.post('/item-vendas', authMiddleware, ItemVendaController.store);
router.put('/item-vendas/:id', authMiddleware, ItemVendaController.update);
router.delete('/item-vendas/:id', authMiddleware, ItemVendaController.destroy);

// Rotas para tipos-recebimento

router.get('/tipos-recebimento', authMiddleware, TipoRecebimentoController.index);
router.get('/tipos-recebimento/:id', authMiddleware, TipoRecebimentoController.show);
router.post('/tipos-recebimento', authMiddleware, TipoRecebimentoController.store);
router.put('/tipos-recebimento/:id', authMiddleware, TipoRecebimentoController.update);
router.delete('/tipos-recebimento/:id', authMiddleware, TipoRecebimentoController.destroy);

// Rotas para formas-pagamento

router.get('/formas-pagamento', authMiddleware, FormaPagamentoController.index);
router.get('/formas-pagamento/:id', authMiddleware, FormaPagamentoController.show);
router.post('/formas-pagamento', authMiddleware, FormaPagamentoController.store);
router.put('/formas-pagamento/:id', authMiddleware, FormaPagamentoController.update);
router.delete('/formas-pagamento/:id', authMiddleware, FormaPagamentoController.destroy);

module.exports = router;
