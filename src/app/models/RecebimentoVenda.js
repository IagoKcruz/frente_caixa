const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const Venda = require('./Venda');
const FormaPagamento = require('/FormaPagamento');

const RecebimentoVenda = sequelize.define('RecebimentoVenda', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  venda_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  forma_pagamento_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
}, {
  tableName: 'recebimento_venda',
  timestamps: false,
});

// Associações
RecebimentoVenda.belongsTo(Venda, { foreignKey: 'venda_id', as: 'venda' });
RecebimentoVenda.belongsTo(FormaPagamento, { foreignKey: 'forma_pagamento_id', as: 'formaPagamento' });

module.exports = RecebimentoVenda;
