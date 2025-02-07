const CategoriaRepository = require('../repositories/CategoriaRepository');

class CategoriaService {
  async getAllCategorias() {
    return await CategoriaRepository.findAll();
  }
  
  async getCategoriaFiltrada() {
    let whereCondition = nome ? { descricao: { [Op.like]: `%${nome}%` } }: {};
    return await CategoriaRepository.GetCategoriaFiltrada(whereCondition);
  }

  async getCategoriaById(id) {
    return await CategoriaRepository.findById(id);
  }

  async createCategoria(data) {
    return await CategoriaRepository.create(data);
  }

  async updateCategoria(id, data) {
    return await CategoriaRepository.update(id, data);
  }

  async deleteCategoria(id) {
    const categoria = CategoriaRepository.findById(id)
    return await CategoriaRepository.delete(categoria);
  }
}

module.exports = new CategoriaService();
