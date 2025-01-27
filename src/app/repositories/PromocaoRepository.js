const { Promocao } = require('../models');
const BasicRepository = require('./BasicReposiroty');

class PromocaoRepository extends BasicRepository {
  constructor() {
    super(Cliente);
  }
}

module.exports = new PromocaoRepository();