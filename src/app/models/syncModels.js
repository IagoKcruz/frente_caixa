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

const syncModels = async (force = false) => {
  try {
    console.log('Iniciando sincronização do banco de dados...');

    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    models.forEach((model) => model);

    await sequelize.sync({ force });
    console.log('Models sincronizadas com sucesso!');

    if (force) {
      console.log('Foram recriadas todas as tabelas no banco de dados devido ao uso de force=true.');
    }
  } catch (error) {
    console.error('Erro ao sincronizar os modelos:', error);
  } finally {
    // Fechar a conexão
    await sequelize.close();
    console.log('Conexão com o banco de dados encerrada.');
  }
};

// Exporta a função para uso externo
module.exports = syncModels;