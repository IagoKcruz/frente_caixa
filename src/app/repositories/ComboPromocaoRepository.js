const { ComboPromocao } = require('../models');
const BasicRepository = require('./BasicReposiroty');

class ComboPromocaoRepository extends BasicRepository {
  constructor() {
    super(Cliente);
  }
}

module.exports = new ComboPromocaoRepository();