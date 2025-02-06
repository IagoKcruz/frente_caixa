const express = require('express');
const PromocaoController = require('../controllers/helpers/PromocaoController');
const ClienteController = require('../controllers/operacoes/ClienteController');
const AuthController = require("../controllers/operacoes/UserAuthController");    
const CadastrarMunicipio = require('../controllers/operacoes/CadastrarMunicipioController')

const authMiddleware = require("../middlewares/auth");
const addMenu = require('../middlewares/front/MenuItems');

const router = express.Router();

router.get("/", AuthController.openHome);
router.post("/login", AuthController.login);
router.post("/find-user", AuthController.findUserByEmail);
router.get('/register', AuthController.openRegisterPage);


router.get('/dashboardadmin', addMenu, authMiddleware(["ADMIN"]) , PromocaoController.openDashboard);
router.post('/register-cliente', ClienteController.criar)
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/caixa/');
});

router.post("/listar-municipios", CadastrarMunicipio.listarMunicipios);
router.get("/cadastrar-municipio", authMiddleware(["ADMIN"]), CadastrarMunicipio.openPageMunicipio);
router.post("/municipio-criar", authMiddleware(["ADMIN"]), CadastrarMunicipio.createMunicipio);
router.put("/municipio-update", authMiddleware(["ADMIN"]), CadastrarMunicipio.updateMunicipio);
router.delete("/municipio-delete", authMiddleware(["ADMIN"]), CadastrarMunicipio.deleteMunicipio);


// Rotas para Promoção
router.get('/promocoes', PromocaoController.listar);
router.post('/promocoes', PromocaoController.criar);
router.get('/promocoes/:id', PromocaoController.buscarPorId);
router.put('/promocoes/:id', PromocaoController.atualizar);
router.delete('/promocoes/:id', PromocaoController.deletar);



module.exports = router;
