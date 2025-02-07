const express = require('express');
const PromocaoController = require('../controllers/helpers/PromocaoController');
const ClienteController = require('../controllers/operacoes/ClienteController');
const AuthController = require("../controllers/operacoes/UserAuthController");    
const CadastrarMunicipio = require('../controllers/operacoes/CadastrarMunicipioController')
const CadastrarUnidadeMedida = require('../controllers/operacoes/')
const CadastrarCategoria = require('../controllers/operacoes/')

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

router.post("/listar-UnidadeMedidas", CadastrarUnidadeMedida.listarUnidadeMedidas);
router.get("/cadastrar-UnidadeMedida", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.openPageUnidadeMedida);
router.post("/UnidadeMedida-criar", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.createUnidadeMedida);
router.put("/UnidadeMedida-update", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.updateUnidadeMedida);
router.delete("/UnidadeMedida-delete", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.deleteUnidadeMedida);

router.post("/listar-Categorias", CadastrarCategoria.listarCategorias);
router.get("/cadastrar-Categoria", authMiddleware(["ADMIN"]), CadastrarCategoria.openPageCategoria);
router.post("/Categoria-criar", authMiddleware(["ADMIN"]), CadastrarCategoria.createCategoria);
router.put("/Categoria-update", authMiddleware(["ADMIN"]), CadastrarCategoria.updateCategoria);
router.delete("/Categoria-delete", authMiddleware(["ADMIN"]), CadastrarCategoria.deleteCategoria);





module.exports = router;
