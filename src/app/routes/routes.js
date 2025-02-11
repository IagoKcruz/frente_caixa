const express = require('express');
const ClienteController = require('../controllers/operacoes/ClienteController');
const AuthController = require("../controllers/operacoes/UserAuthController");    
const CadastrarMunicipio = require('../controllers/operacoes/CadastrarMunicipioController')
const CadastrarUnidadeMedida = require('../controllers/operacoes/CadastrarUnidadeMedidaController')
const CadastrarCategoria = require('../controllers/operacoes/CadastrarCategoriaController')
const RegistrarItem = require('../controllers/operacoes/RegistrarItemController.js')
const authMiddleware = require("../middlewares/auth");
const CadastrarPromocao = require('../controllers/operacoes/CadastrarPromocaoController.js');
const ConsultarUsuarios = require('../controllers/operacoes/ConsultarUsuariosController.js');
const Catalogo = require('../controllers/operacoes/CatalogoController.js');

const ValidRegistrarItem = require('../middlewares/validacoes/ValidRegistrarItem.js');
const validarCadastro = require('../middlewares/validacoes/ValidRegister.js');
const validarPromocao = require('../middlewares/validacoes/ValidPromocao.js');
const validarComboPromocao = require('../middlewares/validacoes/ValidComboPromocao.js');
const ValidarFormaPagamento = require('../middlewares/validacoes/ValidFormaPagamento.js');

const enumRole = require('../utilsBack/EnumRoles.js');

const addMenu = require('../middlewares/front/MenuItems');
const CadastrarFormaPagamentoController = require('../controllers/operacoes/CadastrarFormaPagamentoController.js');


const router = express.Router();

router.get("/", AuthController.index);
router.post("/login", AuthController.login);
router.post("/find-user", AuthController.findUserByEmail);
router.get('/register', AuthController.openRegisterPage);


router.post('/register-cliente', validarCadastro, ClienteController.criar)
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/caixa/');
});

router.get("/cadastrar-Municipio", authMiddleware(enumRole.ADMIN), CadastrarMunicipio.openPageMunicipio);
router.post("/listar-municipios", authMiddleware(enumRole.ADMIN), CadastrarMunicipio.listarMunicipios);
router.post("/municipio-criar", authMiddleware(enumRole.ADMIN), CadastrarMunicipio.createMunicipio);
router.put("/municipio-update", authMiddleware(enumRole.ADMIN), CadastrarMunicipio.updateMunicipio);
router.delete("/municipio-delete", authMiddleware(enumRole.ADMIN), CadastrarMunicipio.deleteMunicipio);

router.get("/cadastrar-UnidadeMedida", authMiddleware(enumRole.ADMIN), CadastrarUnidadeMedida.openPageUnidadeMedida);
router.post("/listar-UnidadeMedida", authMiddleware(enumRole.ADMIN), CadastrarUnidadeMedida.listarUnidadeMedidas);
router.post("/UnidadeMedida-criar", authMiddleware(enumRole.ADMIN), CadastrarUnidadeMedida.createUnidadeMedida);
router.put("/UnidadeMedida-update", authMiddleware(enumRole.ADMIN), CadastrarUnidadeMedida.updateUnidadeMedida);
router.delete("/UnidadeMedida-delete", authMiddleware(enumRole.ADMIN), CadastrarUnidadeMedida.deleteUnidadeMedida);

router.get("/cadastrar-Categoria", authMiddleware(enumRole.ADMIN), CadastrarCategoria.openPageCategoria);
router.post("/listar-Categoria", authMiddleware(enumRole.ADMIN), CadastrarCategoria.listarCategorias);
router.post("/Categoria-criar", authMiddleware(enumRole.ADMIN), CadastrarCategoria.createCategoria);
router.put("/Categoria-update", authMiddleware(enumRole.ADMIN), CadastrarCategoria.updateCategoria);
router.delete("/Categoria-delete", authMiddleware(enumRole.ADMIN), CadastrarCategoria.deleteCategoria);

router.get("/registrar-Item", authMiddleware(enumRole.ADMIN), RegistrarItem.openRegistrarItem);
router.get("/listar-item-combo", RegistrarItem.listarItemCombo);
router.post("/itens/criar", authMiddleware(enumRole.ADMIN), ValidRegistrarItem, RegistrarItem.criarItem);
router.post("/itens/update", authMiddleware(enumRole.ADMIN), ValidRegistrarItem,RegistrarItem.atualizarItem);
router.post("/itens/delete", authMiddleware(enumRole.ADMIN), RegistrarItem.deletarItem);

router.get("/cadastrar-Promocao", authMiddleware(enumRole.ADMIN), CadastrarPromocao.openPagePromocao);
router.post("/listar-Promocao", authMiddleware(enumRole.ADMIN), CadastrarPromocao.listarPromocoes);
router.post("/Promocao-criar", authMiddleware(enumRole.ADMIN), validarPromocao, CadastrarPromocao.createPromocao);
router.post("/verificar-promcao-com-items", authMiddleware(enumRole.ADMIN), CadastrarPromocao.verificarSePromoTemComboPromo);
router.put("/Promocao-update", authMiddleware(enumRole.ADMIN), validarPromocao, CadastrarPromocao.updatePromocao);

router.post("/ComboPromocao-criar", authMiddleware(enumRole.ADMIN), validarComboPromocao, CadastrarPromocao.createComboPromocao);
router.put("/ComboPromocao-update", authMiddleware(enumRole.ADMIN), validarComboPromocao, CadastrarPromocao.updateComboPromocao);
router.delete("/ComboPromocao-delete", authMiddleware(enumRole.ADMIN), CadastrarPromocao.deleteComboPromocao);

router.get("/usuarios/page", authMiddleware(enumRole.ADMIN), ConsultarUsuarios.openPage);
router.post("/listar-Usuarios", authMiddleware(enumRole.ADMIN), ConsultarUsuarios.listarUsuarios);
router.put("/Usuario-update", authMiddleware(enumRole.ADMIN), ConsultarUsuarios.updateUsuario);


router.get('/catalogo', addMenu, authMiddleware(enumRole.ADMIN, enumRole.CLIENTE), Catalogo.openCatalogoPage);

router.get("/FormaPagamento/openPage", authMiddleware(enumRole.ADMIN), CadastrarFormaPagamentoController.openPageFormaPagamento);
router.post("/listar-FormaPagamento", authMiddleware(enumRole.ADMIN), CadastrarFormaPagamentoController.listarFormaPagamentos);
router.post("/FormaPagamento-criar", authMiddleware(enumRole.ADMIN), ValidarFormaPagamento, CadastrarFormaPagamentoController.createFormaPagamento);
router.put("/FormaPagamento-update", authMiddleware(enumRole.ADMIN),  ValidarFormaPagamento, CadastrarFormaPagamentoController.updateFormaPagamento);
router.delete("/FormaPagamento-delete", authMiddleware(enumRole.ADMIN), CadastrarFormaPagamentoController.deleteFormaPagamento);


module.exports = router;

