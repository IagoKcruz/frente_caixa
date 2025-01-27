const sequelize = require('../../config/database');
const Cliente = require('./Cliente');
const Promocao = require('./Promocao');
const Municipio = require('./Municipio');
const ComboPromocao = require('./ComboPromocao.js');
const Item = require('./Item.js');
const Categoria = require('./Categoria');
const UnidadeMedida = require('./UnidadeMedida');
const Venda = require('./Venda');

ComboPromocao.aync();
Promocao.sync();
Item.sync();
Categoria.sync();
UnidadeMedida.sync();
Venda.sync();
Cliente.sync();
// Sincronizar modelos
const syncModels = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = { sequelize, Promocao, ComboPromocao, syncModels };