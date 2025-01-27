const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const TipoRecebimento = sequelize.define('TipoRecebimento', {
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
  tableName: 'tipo_recebimento',
  timestamps: false,
});

module.exports = TipoRecebimento;