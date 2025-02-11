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
const enumRole = require('../utilsBack/EnumRoles.js');

const addMenu = require('../middlewares/front/MenuItems');


const router = express.Router();

router.get("/", AuthController.openHome);
router.post("/login", AuthController.login);
router.post("/find-user", AuthController.findUserByEmail);
router.get('/register', AuthController.openRegisterPage);


router.get('/dashboardadmin', addMenu, authMiddleware(enumRole.CLIENTE) , PromocaoController.openDashboard);
router.post('/register-cliente', validarCadastro, ClienteController.criar)
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/caixa/');
});

router.get("/cadastrar-Municipio", authMiddleware(enumRole.CLIENTE), CadastrarMunicipio.openPageMunicipio);
router.post("/listar-municipios", authMiddleware(enumRole.CLIENTE), CadastrarMunicipio.listarMunicipios);
router.post("/municipio-criar", authMiddleware(enumRole.CLIENTE), CadastrarMunicipio.createMunicipio);
router.put("/municipio-update", authMiddleware(enumRole.CLIENTE), CadastrarMunicipio.updateMunicipio);
router.delete("/municipio-delete", authMiddleware(enumRole.CLIENTE), CadastrarMunicipio.deleteMunicipio);

router.get("/cadastrar-UnidadeMedida", authMiddleware(enumRole.CLIENTE), CadastrarUnidadeMedida.openPageUnidadeMedida);
router.post("/listar-UnidadeMedida", authMiddleware(enumRole.CLIENTE), CadastrarUnidadeMedida.listarUnidadeMedidas);
router.post("/UnidadeMedida-criar", authMiddleware(enumRole.CLIENTE), CadastrarUnidadeMedida.createUnidadeMedida);
router.put("/UnidadeMedida-update", authMiddleware(enumRole.CLIENTE), CadastrarUnidadeMedida.updateUnidadeMedida);
router.delete("/UnidadeMedida-delete", authMiddleware(enumRole.CLIENTE), CadastrarUnidadeMedida.deleteUnidadeMedida);

router.get("/cadastrar-Categoria", authMiddleware(enumRole.CLIENTE), CadastrarCategoria.openPageCategoria);
router.post("/listar-Categoria", authMiddleware(enumRole.CLIENTE), CadastrarCategoria.listarCategorias);
router.post("/Categoria-criar", authMiddleware(enumRole.CLIENTE), CadastrarCategoria.createCategoria);
router.put("/Categoria-update", authMiddleware(enumRole.CLIENTE), CadastrarCategoria.updateCategoria);
router.delete("/Categoria-delete", authMiddleware(enumRole.CLIENTE), CadastrarCategoria.deleteCategoria);

router.get("/registrar-Item", authMiddleware(enumRole.CLIENTE), RegistrarItem.openRegistrarItem);
router.get("/listar-item-combo", RegistrarItem.listarItemCombo);
router.post("/itens/criar", authMiddleware(enumRole.CLIENTE), ValidRegistrarItem, RegistrarItem.criarItem);
router.post("/itens/update", authMiddleware(enumRole.CLIENTE), ValidRegistrarItem,RegistrarItem.atualizarItem);
router.post("/itens/delete", authMiddleware(enumRole.CLIENTE), RegistrarItem.deletarItem);

router.get("/cadastrar-Promocao", CadastrarPromocao.openPagePromocao);
router.post("/listar-Promocao",CadastrarPromocao.listarPromocoes);
router.post("/Promocao-criar", validarPromocao, CadastrarPromocao.createPromocao);
router.post("/verificar-promcao-com-items", CadastrarPromocao.verificarSePromoTemComboPromo);
router.put("/Promocao-update", validarPromocao, CadastrarPromocao.updatePromocao);

router.post("/ComboPromocao-criar", validarComboPromocao, CadastrarPromocao.createComboPromocao);
router.put("/ComboPromocao-update", validarComboPromocao, CadastrarPromocao.updateComboPromocao);
router.delete("/ComboPromocao-delete", CadastrarPromocao.deleteComboPromocao);

module.exports = router;

