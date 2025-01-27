const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const TipoOperacao = sequelize.define('TipoOperacao', {
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
}, {
  tableName: 'tipo_operacao',
  timestamps: false,
});

module.exports = TipoOperacao;
