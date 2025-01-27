const BasicRepository = require('./BasicRepository.js');
const Categoria = require('../models/Categoria');

class CategoriaRepository extends BasicRepository {
  constructor() {
    super(Categoria);
  }
}

module.exports = CategoriaRepository;
