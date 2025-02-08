const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Venda = require('./Venda');
const FormaPagamento = require('./Formapagamento');
const TipoRecebimento = require('./TipoRecebimento');

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
  tipo_recebimento_id: {
    type: DataTypes.INTEGER(11),
  },
}, {
  tableName: 'recebimento_venda',
  timestamps: false,
});

// Associações
RecebimentoVenda.belongsTo(Venda, { foreignKey: 'venda_id', as: 'venda' });
RecebimentoVenda.belongsTo(FormaPagamento, { foreignKey: 'forma_pagamento_id', as: 'formaPagamento_receb_venda' });
RecebimentoVenda.belongsTo(TipoRecebimento, { foreignKey: 'tipo_recebimento_id', as: 'tipo_recebimento_receb_venda' });

module.exports = RecebimentoVenda;
