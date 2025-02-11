const BasicRepository = require('./BasicRepository.js');
const TipoOperacao = require('../models/TipoOperacao');

class TipoOperacaoRepository extends BasicRepository {
  constructor() {
    super(TipoOperacao);
  }
}

module.exports = new TipoOperacaoRepository();
