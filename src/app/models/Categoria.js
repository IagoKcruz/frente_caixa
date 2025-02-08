const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  sn_ativo: {
    type: DataTypes.CHAR(2)
  }
}, {
  tableName: 'categoria',
  timestamps: false,
});

module.exports = Categoria;
