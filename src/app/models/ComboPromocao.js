const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Promocao = require('./Promocao');

const ComboPromocao = sequelize.define('ComboPromocao', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  valor_promocao: {
    type: DataTypes.FLOAT(10, 2),
  },
  promocao_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
});


module.exports = ComboPromocao;