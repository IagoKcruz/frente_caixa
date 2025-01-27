const BasicRepository = require('./BasicRepository');
const RecebimentoVenda = require('../models/RecebimentoVenda');

class RecebimentoVendaRepository extends BasicRepository {
  constructor() {
    super(RecebimentoVenda);
  }
}

module.exports = RecebimentoVendaRepository;
