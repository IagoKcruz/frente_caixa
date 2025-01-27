const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Item = require('./Item');

const ComboPromocao = sequelize.define('ComboPromocao', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  valor_promocao: {
    type: DataTypes.FLOAT(10, 2),
  },
  item_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
});

// Definir associações
ComboPromocao.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });

module.exports = ComboPromocao;