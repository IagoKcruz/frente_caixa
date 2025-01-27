const TipoRecebimento = require('../models/TipoRecebimento');
const BasicRepository = require('./BasicReposiroty.js');

class TipoRecebimentoRepository extends BasicRepository {
  constructor() {
    super(TipoRecebimento);
  }
}

module.exports = TipoRecebimentoRepository;
