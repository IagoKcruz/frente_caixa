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

module.exports = Promocao;