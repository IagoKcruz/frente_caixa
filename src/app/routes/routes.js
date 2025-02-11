const express = require('express');
const PromocaoController = require('../controllers/helpers/PromocaoController');
const ClienteController = require('../controllers/operacoes/ClienteController');
const AuthController = require("../controllers/operacoes/UserAuthController");    
const CadastrarMunicipio = require('../controllers/operacoes/CadastrarMunicipioController')
const CadastrarUnidadeMedida = require('../controllers/operacoes/CadastrarUnidadeMedidaController')
const CadastrarCategoria = require('../controllers/operacoes/CadastrarCategoriaController')
const RegistrarItem = require('../controllers/operacoes/RegistrarItemController.js')
const authMiddleware = require("../middlewares/auth");
const ValidRegistrarItem = require('../middlewares/validacoes/ValidRegistrarItem.js');
const validarCadastro = require('../middlewares/validacoes/ValidRegister.js');
const validarPromocao = require('../middlewares/validacoes/ValidPromocao.js');
const validarComboPromocao = require('../middlewares/validacoes/ValidComboPromocao.js');
const CadastrarPromocao = require('../controllers/operacoes/CadastrarPromocaoController.js');
const addMenu = require('../middlewares/front/MenuItems');


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
router.post("/listar-municipios", authMiddleware(["ADMIN"]), CadastrarMunicipio.listarMunicipios);
router.post("/municipio-criar", authMiddleware(["ADMIN"]), CadastrarMunicipio.createMunicipio);
router.put("/municipio-update", authMiddleware(["ADMIN"]), CadastrarMunicipio.updateMunicipio);
router.delete("/municipio-delete", authMiddleware(["ADMIN"]), CadastrarMunicipio.deleteMunicipio);

router.get("/cadastrar-UnidadeMedida", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.openPageUnidadeMedida);
router.post("/listar-UnidadeMedida", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.listarUnidadeMedidas);
router.post("/UnidadeMedida-criar", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.createUnidadeMedida);
router.put("/UnidadeMedida-update", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.updateUnidadeMedida);
router.delete("/UnidadeMedida-delete", authMiddleware(["ADMIN"]), CadastrarUnidadeMedida.deleteUnidadeMedida);

router.get("/cadastrar-Categoria", authMiddleware(["ADMIN"]), CadastrarCategoria.openPageCategoria);
router.post("/listar-Categoria", authMiddleware(["ADMIN"]), CadastrarCategoria.listarCategorias);
router.post("/Categoria-criar", authMiddleware(["ADMIN"]), CadastrarCategoria.createCategoria);
router.put("/Categoria-update", authMiddleware(["ADMIN"]), CadastrarCategoria.updateCategoria);
router.delete("/Categoria-delete", authMiddleware(["ADMIN"]), CadastrarCategoria.deleteCategoria);

router.get("/registrar-Item", authMiddleware(["ADMIN"]), RegistrarItem.openRegistrarItem);
router.get("/listar-item-combo", RegistrarItem.listarItemCombo);
router.post("/itens/criar", authMiddleware(["ADMIN"]), ValidRegistrarItem, RegistrarItem.criarItem);
router.post("/itens/update", authMiddleware(["ADMIN"]), ValidRegistrarItem,RegistrarItem.atualizarItem);
router.post("/itens/delete", authMiddleware(["ADMIN"]), RegistrarItem.deletarItem);

router.get("/cadastrar-Promocao", CadastrarPromocao.openPagePromocao);
router.post("/listar-Promocao",CadastrarPromocao.listarPromocoes);
router.post("/Promocao-criar", validarPromocao, CadastrarPromocao.createPromocao);
router.post("/verificar-promcao-com-items", CadastrarPromocao.verificarSePromoTemComboPromo);
router.put("/Promocao-update", validarPromocao, CadastrarPromocao.updatePromocao);

router.post("/ComboPromocao-criar", validarComboPromocao, CadastrarPromocao.createComboPromocao);
router.put("/ComboPromocao-update", validarComboPromocao, CadastrarPromocao.updateComboPromocao);
router.delete("/ComboPromocao-delete", CadastrarPromocao.deleteComboPromocao);

module.exports = router;

