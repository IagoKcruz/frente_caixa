const BasicRepository = require('./BasicRepository.js');
const Categoria = require('../models/Categoria');

class CategoriaRepository extends BasicRepository {
  constructor() {
    super(Categoria);
  }

  async GetCategoriaFiltrada(whereCondition){
    await this.findAll({where : whereCondition})
  }
}

module.exports = new CategoriaRepository();
