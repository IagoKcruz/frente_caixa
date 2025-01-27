const { Promocao } = require('../models');
const BasicRepository = require('./BasicRepository');

class PromocaoRepository extends BasicRepository {
  constructor() {
    super(Cliente);
  }
}

module.exports = new PromocaoRepository();