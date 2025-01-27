const CategoriaRepository = require('../repositories/CategoriaRepository');

class CategoriaService {
  constructor() {
    this.categoriaRepository = new CategoriaRepository();
  }

  async getAllCategorias() {
    return this.categoriaRepository.findAll();
  }

  async getCategoriaById(id) {
    return this.categoriaRepository.findById(id);
  }

  async createCategoria(data) {
    return this.categoriaRepository.create(data);
  }

  async updateCategoria(id, data) {
    return this.categoriaRepository.update(id, data);
  }

  async deleteCategoria(id) {
    return this.categoriaRepository.delete(id);
  }
}

module.exports = CategoriaService;
