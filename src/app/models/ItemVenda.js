const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Item = require('./Item');
const Venda = require('./Venda');
const Usuario = require('./Usuario');

const ItemVenda = sequelize.define('ItemVenda', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER(9),
    allowNull: false,
  },
  preco: {
    type: DataTypes.INTEGER(9),
    allowNull: false,
  },
  total: {
    type: DataTypes.INTEGER(9),
    allowNull: false,
  },
  desconto: {
    type: DataTypes.INTEGER(3),
    allowNull: false,
  },
  acrescimo: {
    type: DataTypes.INTEGER(5),
    allowNull: false,
  },
  data_venda: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  item_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  venda_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  sn_ativo: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
}, {
  tableName: 'item_venda',
  timestamps: false,
});

// Associações
ItemVenda.belongsTo(Item, { foreignKey: 'item_id', as: 'item' });
ItemVenda.belongsTo(Venda, { foreignKey: 'venda_id', as: 'venda' });
ItemVenda.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

module.exports = ItemVenda;