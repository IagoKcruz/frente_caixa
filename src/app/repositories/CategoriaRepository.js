const BasicRepository = require('./BasicRepository.js');
const Categoria = require('../models/Categoria');

class CategoriaRepository extends BasicRepository {
  constructor() {
    super(Categoria);
  }

  async GetCategoriaFiltrada(nome) {
    await this.findAll({ where: { descricao: { [Op.like]: `%${nome}%` } } })
  }
}

module.exports = new CategoriaRepository();
