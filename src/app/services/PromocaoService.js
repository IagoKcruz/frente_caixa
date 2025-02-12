const ComboPromocaoRepository = require('../repositories/ComboPromocaoRepository');
const PromocaoRepository = require('../repositories/PromocaoRepository');

class PromocaoService {
  async listarPromocoes() {
    return await PromocaoRepository.findAllComInclude();
  }

  async listarPromocoesPorDescricao(nome) {
    const response = await PromocaoRepository.listarPromocoesPorDescricao(nome)
    return response;
  }

  async verificarSePromoTemComboPromo(promoId) {
    const response = await ComboPromocaoRepository.verificarSePromoTemComboPromo(promoId)
    return response;
  }

  async buscarPromocaoPorId(id) {
    return await PromocaoRepository.findById(id);
  }

  async criarPromocao(promocaoData) {
    return await PromocaoRepository.create(promocaoData);
  }

  async updatePromocao(promocaoData) {
    return await PromocaoRepository.update(promocaoData);
  }

  async desativarPromocao(id) {
    const promocao = await PromocaoRepository.findById(id);
    promocao.sn_ativo = "N";
    await PromocaoRepository.update(promocao.id, promocao);

    return promocao;
  }
}

module.exports = new PromocaoService();