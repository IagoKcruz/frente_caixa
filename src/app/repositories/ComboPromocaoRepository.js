const { ComboPromocao } = require('../models');
const BasicRepository = require('./BasicRepository');

class ComboPromocaoRepository extends BasicRepository {
  constructor() {
    super(Cliente);
  }
}

module.exports = new ComboPromocaoRepository();