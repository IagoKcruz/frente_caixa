const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ComboPromocao = sequelize.define('ComboPromocao', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  valor_promocao: {
    type: DataTypes.FLOAT(10, 2),
  }
});


module.exports = ComboPromocao;