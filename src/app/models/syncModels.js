const sequelize = require('../../config/database');
const Cliente = require('./Cliente');
const Promocao = require('./Promocao');
const Municipio = require('./Municipio');
const ComboPromocao = require('./ComboPromocao.js');
const Item = require('./Item.js');
const ItemVenda = require('./ItemVenda.js');
const Categoria = require('./Categoria');
const UnidadeMedida = require('./UnidadeMedida');
const Venda = require('./Venda');
const RecebimentoVenda = require('./RecebimentoVenda.js');
const TipoOperacao = require('./TipoOperacao.js');
const SysLogRegistro = require('./SysLogRegistro.js');
const Usuario = require('./Usuario.js');
const TipoRecebimento = require('./TipoRecebimento.js');
const FormaPagamento = require('./Formapagamento.js');

ComboPromocao.aync();
Promocao.sync();
Item.sync();
Categoria.sync();
UnidadeMedida.sync();
Venda.sync();
Cliente.sync();
TipoOperacao.sync();
Municipio.sync();
TipoOperacao.aync();
ItemVenda.aync();
FormaPagamento.aync();
Usuario.aync();
TipoRecebimento.aync();
RecebimentoVenda.aync();
SysLogRegistro.aync();
// Sincronizar modelos
const syncModels = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = { sequelize, Promocao, ComboPromocao, syncModels };