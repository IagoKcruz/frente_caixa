const TipoRecebimento = require('../models/TipoRecebimento');
const BasicRepository = require('./BasicRepository.js');

class TipoRecebimentoRepository extends BasicRepository {
  constructor() {
    super(TipoRecebimento);
  }
}

module.exports = TipoRecebimentoRepository;
