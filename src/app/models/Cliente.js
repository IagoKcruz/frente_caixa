const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  codigo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cnpj_cpf: {
    type: DataTypes.STRING(13),
    allowNull: false,
  },
  rg: {
    type: DataTypes.STRING(13),
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATE,
  },
  email: {
    type: DataTypes.STRING(120),
  },
  bairro: {
    type: DataTypes.STRING(120),
  },
  numero_logradouro: {
    type: DataTypes.INTEGER,
  },
  logradouro: {
    type: DataTypes.STRING(120),
  },
  inscricao_estadual: {
    type: DataTypes.STRING(11),
  },
  municipio_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  promocao_id: {
    type: DataTypes.CHAR(36),
  },
  sn_ativo: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
});

Cliente.belongsTo(Municipio, { foreignKey: 'municipio_id', as: 'municipio' });
Cliente.belongsTo(Promocao, { foreignKey: 'promocao_id', as: 'promocao' });

module.exports = Cliente;