const express = require('express');
const PromocaoController = require('../controllers/PromocaoController');
const ComboPromocaoController = require('../controllers/ComboPromocaoController');
const ClienteController = require('../controllers/ClienteController');
const MunicipioController = require('../app/controllers/MunicipioController');
const ItemController = require('./app/controllers/ItemController');

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

module.exports = router;
