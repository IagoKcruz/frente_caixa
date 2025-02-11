const BasicRepository = require('./BasicRepository.js');
const Categoria = require('../models/Categoria');
const { Op } = require('sequelize');

class CategoriaRepository extends BasicRepository {
  constructor() {
    super(Categoria);
  }

  async GetCategoriaFiltrada(nome) {
    return await Categoria.findAll({ where: { descricao: { [Op.like]: `%${nome}%` } } })
  }
}

module.exports = new CategoriaRepository();
