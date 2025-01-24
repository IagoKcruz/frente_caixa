const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

class Municipio extends Model {}

Municipio.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Municipio',
    tableName: 'municipio',
    timestamps: false,
  }
);

module.exports = Municipio;
