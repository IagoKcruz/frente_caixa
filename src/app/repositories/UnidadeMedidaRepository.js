const BasicRepository = require('./BasicRepository.js');
const UnidadeMedida = require('../models/UnidadeMedida');

class UnidadeMedidaRepository extends BasicRepository {
  constructor() {
    super(UnidadeMedida);
  }

  async GetAllUnidadesMedidaFiltrada(nome) {
    await this.findAll({ where: { descricao: { [Op.like]: `%${nome}%` } } })
  }
}

module.exports = new UnidadeMedidaRepository();
