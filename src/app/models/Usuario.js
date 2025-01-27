const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  login: {
    type: DataTypes.STRING(9),
    allowNull: false,
  },
  grupo_usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sn_ativo: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
}, {
  tableName: 'usuario',
  timestamps: false,
});

module.exports = Usuario;