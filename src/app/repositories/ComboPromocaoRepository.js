const ComboPromocao = require('../models/ComboPromocao');
const BasicRepository = require('./BasicRepository');

class ComboPromocaoRepository extends BasicRepository {
  constructor() {
    super(ComboPromocao);
  }
}

module.exports = new ComboPromocaoRepository();