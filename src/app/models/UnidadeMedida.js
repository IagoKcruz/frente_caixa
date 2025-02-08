const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class UnidadeMedida extends Model {}

UnidadeMedida.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    sn_ativo: {
      type: DataTypes.CHAR(2)
    }
  },
  {
    sequelize,
    modelName: 'UnidadeMedida',
    tableName: 'unidade_medida',
    timestamps: false,
  }
);

module.exports = UnidadeMedida;
