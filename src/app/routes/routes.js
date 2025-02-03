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
const addMenu = require('../middlewares/front/menu');

const router = express.Router();

router.get("/", AuthController.openHome);
router.post("/login", AuthController.login);
router.post("/find-user", AuthController.findUserByEmail);
router.get('/register', AuthController.openRegisterPage);


router.get('/dashboardadmin', addMenu, authMiddleware(["ADMIN"]) , PromocaoController.openDashboard);

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/caixa/');
});


// Rotas para Promoção
router.get('/promocoes', PromocaoController.listar);
router.post('/promocoes', PromocaoController.criar);
router.get('/promocoes/:id', PromocaoController.buscarPorId);
router.put('/promocoes/:id', PromocaoController.atualizar);
router.delete('/promocoes/:id', PromocaoController.deletar);



module.exports = router;
