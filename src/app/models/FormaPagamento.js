const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const TipoRecebimento = require('./TipoRecebimento');

const FormaPagamento = sequelize.define('FormaPagamento', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  tipo_recebimento_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
}, {
  tableName: 'forma_pagamento',
  timestamps: false,
});

// Associações
FormaPagamento.belongsTo(TipoRecebimento, {
  foreignKey: 'tipo_recebimento_id',
  as: 'tipoRecebimento',
});

module.exports = FormaPagamento;
