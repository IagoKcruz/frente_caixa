const express = require('express');
const PromocaoController = require('../controllers/helpers/PromocaoController');
const ClienteController = require('../controllers/operacoes/ClienteController');
const AuthController = require("../controllers/operacoes/UserAuthController");    
const CadastrarMunicipio = require('../controllers/operacoes/CadastrarMunicipioController')
const CadastrarUnidadeMedida = require('../controllers/operacoes/CadastrarUnidadeMedidaController')
const CadastrarCategoria = require('../controllers/operacoes/CadastrarCategoriaController')
const RegistrarItem = require('../controllers/operacoes/RegistrarItemController.js')
const authMiddleware = require("../middlewares/auth");
const addMenu = require('../middlewares/front/MenuItems');
const ValidRegistrarItem = require('../middlewares/validacoes/ValidRegistrarItem.js');
const validarCadastro = require('../middlewares/validacoes/ValidRegister.js');

const router = express.Router();

router.get("/", AuthController.openHome);
router.post("/login", AuthController.login);
router.post("/find-user", AuthController.findUserByEmail);
router.get('/register', AuthController.openRegisterPage);


router.get('/dashboardadmin', addMenu, authMiddleware(["ADMIN"]) , PromocaoController.openDashboard);
router.post('/register-cliente', validarCadastro, ClienteController.criar)
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/caixa/');
});

router.get("/cadastrar-Municipio", authMiddleware(["ADMIN"]), CadastrarMunicipio.openPageMunicipio);
router.post("/listar-municipios", CadastrarMunicipio.listarMunicipios);
router.post("/municipio-criar", authMiddleware(["ADMIN"]), CadastrarMunicipio.createMunicipio);
router.put("/municipio-update", authMiddleware(["ADMIN"]), CadastrarMunicipio.updateMunicipio);
router.delete("/municipio-delete", authMiddleware(["ADMIN"]), CadastrarMunicipio.deleteMunicipio);

router.get("/cadastrar-UnidadeMedida", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.openPageUnidadeMedida);
router.post("/listar-UnidadeMedida", CadastrarUnidadeMedida.listarUnidadeMedidas);
router.post("/UnidadeMedida-criar", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.createUnidadeMedida);
router.put("/UnidadeMedida-update", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.updateUnidadeMedida);
router.delete("/UnidadeMedida-delete", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.deleteUnidadeMedida);

router.get("/cadastrar-Categoria", authMiddleware(["ADMIN"]), CadastrarCategoria.openPageCategoria);
router.post("/listar-Categoria", CadastrarCategoria.listarCategorias);
router.post("/Categoria-criar", authMiddleware(["ADMIN"]), CadastrarCategoria.createCategoria);
router.put("/Categoria-update", authMiddleware(["ADMIN"]), CadastrarCategoria.updateCategoria);
router.delete("/Categoria-delete", authMiddleware(["ADMIN"]), CadastrarCategoria.deleteCategoria);

router.get("/registrar-Item", RegistrarItem.openRegistrarItem);
router.post("/itens/criar", authMiddleware(["ADMIN"]), ValidRegistrarItem, RegistrarItem.criarItem);
router.post("/itens/update", authMiddleware(["ADMIN"]), RegistrarItem.atualizarItem);
router.post("/itens/delete", authMiddleware(["ADMIN"]), RegistrarItem.deletarItem);

module.exports = router;
