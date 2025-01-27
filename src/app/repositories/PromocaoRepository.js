const Promocao = require('../models/Promocao');
const BasicRepository = require('./BasicRepository');

class PromocaoRepository extends BasicRepository {
  constructor() {
    super(Promocao);
  }
}

module.exports = new PromocaoRepository();