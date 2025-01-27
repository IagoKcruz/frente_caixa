const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Promocao = sequelize.define('Promocao', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
});

Promocao.hasMany(ComboPromocao, { foreignKey: 'item_id', as: 'combos' });

module.exports = Promocao;