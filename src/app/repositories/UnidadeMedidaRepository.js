const BasicRepository = require('./BasicRepository');
const UnidadeMedida = require('../models/UnidadeMedida');

class UnidadeMedidaRepository extends BasicRepository {
  constructor() {
    super(UnidadeMedida);
  }
}

module.exports = UnidadeMedidaRepository;
