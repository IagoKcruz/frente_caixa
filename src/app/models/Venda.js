const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Cliente = require('./Cliente');

const Venda = sequelize.define('Venda', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  total_venda: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  desconto: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  acrescimo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  observacao: {
    type: DataTypes.STRING(700),
    allowNull: true,
  },
  data_criacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  sn_ativo: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  cliente_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
}, {
  tableName: 'venda',
  timestamps: false,
});

// Relacionamento
Venda.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });

module.exports = Venda;