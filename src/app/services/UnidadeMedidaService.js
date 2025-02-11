const UnidadeMedidaRepository = require('../repositories/UnidadeMedidaRepository.js');

class UnidadeMedidaService {
  async getAllUnidadesMedida() {
    return await UnidadeMedidaRepository.findAll();
  }

  async getAllUnidadesMedidaFiltrada(descricao) {
    return await UnidadeMedidaRepository.GetAllUnidadesMedidaFiltrada(descricao);
  }

  async getUnidadeMedidaById(id) {
    return await UnidadeMedidaRepository.findById(id);
  }

  async createUnidadeMedida(data) {
    return await UnidadeMedidaRepository.create(data);
  }

  async updateUnidadeMedida(id, data) {
    return await UnidadeMedidaRepository.update(id, data);
  }

  async deleteUnidadeMedida(id) {
    const unidadeMedida = await UnidadeMedidaRepository.findById(id);
    return await UnidadeMedidaRepository.delete(unidadeMedida);
  }
}

module.exports = new UnidadeMedidaService();
