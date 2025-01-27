const sequelize = require('../../config/database');
const Cliente = require('./Cliente');
const Promocao = require('./Promocao');
const Municipio = require('./Municipio');
const ComboPromocao = require('./ComboPromocao.js');
const Item = require('./app/models/Item');
const Categoria = require('./app/models/Categoria');
const UnidadeMedida = require('./app/models/UnidadeMedida');


Cliente.belongsTo(Municipio, { foreignKey: 'municipio_id', as: 'municipio' });
Cliente.belongsTo(Promocao, { foreignKey: 'promocao_id', as: 'promocao' });
ComboPromocao.belongsTo(Promocao, { foreignKey: 'item_id', as: 'promocao' });
Promocao.hasMany(ComboPromocao, { foreignKey: 'item_id', as: 'combos' });

Item.sync();
Categoria.sync();
UnidadeMedida.sync();

// Sincronizar modelos
const syncModels = async () => {
  await sequelize.sync({ alter: true });
};

module.exports = { sequelize, Promocao, ComboPromocao, syncModels };