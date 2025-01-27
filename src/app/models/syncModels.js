const Sequelize = require('sequelize');
const databaseConfig = require('../../config/database');

// Importação de todos os modelos
const Cliente = require('./Cliente');
const ComboPromocao = require('./ComboPromocao');
const Municipio = require('./Municipio');
const Usuario = require('./Usuario');
const Item = require('./Item');
const Venda = require('./Venda');
const ItemVenda = require('./ItemVenda');
const TipoRecebimento = require('./TipoRecebimento');
const FormaPagamento = require('./Formapagamento');
const RecebimentoVenda = require('./RecebimentoVenda');
const TipoOperacao = require('./TipoOperacao');
const SysLogRegistro = require('./SysLogRegistro');
const Categoria = require('./Categoria');
const UnidadeMedida = require('./UnidadeMedida'); // Novo modelo

// Lista de modelos para inicialização
const models = [
  Cliente,
  ComboPromocao,
  Municipio,
  Usuario,
  Item,
  Venda,
  ItemVenda,
  TipoRecebimento,
  FormaPagamento,
  RecebimentoVenda,
  TipoOperacao,
  SysLogRegistro,
  Categoria,
  UnidadeMedida,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // Inicializar todos os modelos
    models
      .forEach((model) => model.init(this.connection));

    // Configurar associações, se existirem
    models
      .forEach((model) => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();
