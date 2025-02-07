const BasicRepository = require('./BasicRepository.js');
const UnidadeMedida = require('../models/UnidadeMedida');

class UnidadeMedidaRepository extends BasicRepository {
  constructor() {
    super(UnidadeMedida);
  }

  async GetAllUnidadesMedidaFiltrada(whereCondition){
    await this.findAll(whereCondition)
  }
}

module.exports = new  UnidadeMedidaRepository();
