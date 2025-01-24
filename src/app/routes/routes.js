const express = require('express');
const PromocaoController = require('../app/controllers/PromocaoController');
const ComboPromocaoController = require('../app/controllers/ComboPromocaoController');
const ClienteController = require('../app/controllers/ClienteController');

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

module.exports = router;
