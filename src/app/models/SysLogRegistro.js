const { DataTypes } = require('sequelize');
const sequelize = require('../../database');
const TipoOperacao = require('./TipoOperacao');
const Usuario = require('./Usuario');
const Venda = require('./Venda');

const SysLogRegistro = sequelize.define('SysLogRegistro', {
  id: {
    type: DataTypes.CHAR(36),
    primaryKey: true,
    allowNull: false,
  },
  tipo_operacao_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
  },
  venda_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  usuario_registro_id: {
    type: DataTypes.CHAR(36),
    allowNull: false,
  },
  data_venda: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  query: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  sn_ativo: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
}, {
  tableName: 'sys_log_registro',
  timestamps: false,
});

// Associações
SysLogRegistro.belongsTo(TipoOperacao, { foreignKey: 'tipo_operacao_id', as: 'tipoOperacao' });
SysLogRegistro.belongsTo(Usuario, { foreignKey: 'usuario_registro_id', as: 'usuarioRegistro' });
SysLogRegistro.belongsTo(Venda, { foreignKey: 'venda_id', as: 'venda' });

module.exports = SysLogRegistro;
