const sequelize = require('../../config/database');

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
// Associando os modelos ao Sequelize
models.forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

const syncModels = async (force = true) => {
  try {
    console.log('Iniciando sincronização do banco de dados...');

    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Sincronização correta dos modelos
    await sequelize.sync({ force });
    console.log('Models sincronizados com sucesso!');

    if (force) {
      console.log('Todas as tabelas foram recriadas devido a force=true.');
    }
  } catch (error) {
    console.error('Erro ao sincronizar os modelos:', error);
  }
};

// Exporta a função para uso externo
module.exports = syncModels;