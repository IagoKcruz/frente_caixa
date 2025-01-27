const UnidadeMedidaRepository = require('../repositories/UnidadeMedidaRepository');

class UnidadeMedidaService {
  constructor() {
    this.unidadeMedidaRepository = new UnidadeMedidaRepository();
  }

  async getAllUnidadesMedida() {
    return this.unidadeMedidaRepository.findAll();
  }

  async getUnidadeMedidaById(id) {
    return this.unidadeMedidaRepository.findById(id);
  }

  async createUnidadeMedida(data) {
    return this.unidadeMedidaRepository.create(data);
  }

  async updateUnidadeMedida(id, data) {
    return this.unidadeMedidaRepository.update(id, data);
  }

  async deleteUnidadeMedida(id) {
    return this.unidadeMedidaRepository.delete(id);
  }
}

module.exports = UnidadeMedidaService;
