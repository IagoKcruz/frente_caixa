const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Categoria = require('./Categoria');
const UnidadeMedida = require('./UnidadeMedida');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING(9),
    allowNull: false,
  },
  codigo_de_barra: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unidade_medida_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  saldo_estoque_atual: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  registrar_comissao: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  sn_ativo: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(120),
    allowNull: true,
  },
  preco: {
    type: DataTypes.FLOAT(8, 2),
    allowNull: false,
  },
}, {
  tableName: 'item',
  timestamps: false,
});

// Relacionamentos
Item.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
Item.belongsTo(UnidadeMedida, { foreignKey: 'unidade_medida_id', as: 'unidade_medida' });

module.exports = Item;