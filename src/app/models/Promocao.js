const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const ComboPromocao = require('./ComboPromocao');

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
  promocao_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
});


module.exports = Promocao;