const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Municipio = sequelize.define('Municipio',  {
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
