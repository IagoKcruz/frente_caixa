const BasicRepository = require('./BasicRepository.js');
const UnidadeMedida = require('../models/UnidadeMedida');
const { Op } = require('sequelize');

class UnidadeMedidaRepository extends BasicRepository {
  constructor() {
    super(UnidadeMedida);
  }

  async GetAllUnidadesMedidaFiltrada(nome) {
    await UnidadeMedida.findAll({ where: { descricao: { [Op.like]: `%${nome}%` } } })
  }
}

module.exports = new UnidadeMedidaRepository();
