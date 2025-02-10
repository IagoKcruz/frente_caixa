const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Promocao = sequelize.define('Promocao', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  valor_final: {
    type: DataTypes.FLOAT(10, 2),
  },
  sn_promocao_geral: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
  sn_percentagem: {
    type: DataTypes.CHAR(2),
  },
  sn_ativo: {
    type: DataTypes.CHAR(2),
  },
}, {
  tableName: 'Promocao',
  modelName: 'Promocao',
});

Promocao.hasMany(require('./ComboPromocao'), { foreignKey: 'promocao_id', as: 'combos_promocao' });

module.exports = Promocao;
