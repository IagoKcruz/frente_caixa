const express = require('express');
const UserController = require('../controllers/User/UserController.js');
const router = express.Router();

// Rotas de usuário
router.get('/users', UserController.getAll);
router.post('/users/createUser', UserController.create);
router.get('/users/page', UserController.index);

module.exports = router;