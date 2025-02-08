const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Item = require('./Item');  // Corrija o caminho se necessário
const Promocao = require('./Promocao');  // Corrija o caminho se necessário

const ComboPromocao = sequelize.define('ComboPromocao', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  valor_promocao: {
    type: DataTypes.FLOAT(10, 2),
  },
  valor_percentagem: {
    type: DataTypes.INTEGER(3),
  },
  valor_final_promocao: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false,
  },
  promocao_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  item_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  }
}, {
  tableName: 'combo_promocao',
  modelName: 'ComboPromocao',
});

ComboPromocao.belongsTo(Item, { foreignKey: 'item_id', as: 'item_combo_2' });

module.exports = ComboPromocao;
