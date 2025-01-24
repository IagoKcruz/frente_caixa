const PromocaoRepository = require('../repositories/PromocaoRepository');

class PromocaoService {
  async listarPromocoes() {
    return await PromocaoRepository.findAll();
  }

  async buscarPromocaoPorId(id) {
    return await PromocaoRepository.findById(id);
  }

  async criarPromocao(promocaoData) {
    return await PromocaoRepository.create(promocaoData);
  }

  async atualizarPromocao(id, promocaoData) {
    return await PromocaoRepository.update(id, promocaoData);
  }

  async deletarPromocao(id) {
    return await PromocaoRepository.delete(id);
  }
}

module.exports = new PromocaoService();