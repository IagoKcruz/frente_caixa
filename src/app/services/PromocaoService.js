const ComboPromocaoRepository = require('../repositories/ComboPromocaoRepository');
const PromocaoRepository = require('../repositories/PromocaoRepository');

class PromocaoService {
  async listarPromocoes() {
    return await PromocaoRepository.findAllComInclude();
  }

  async listarPromocoesPorDescricao() {
    let whereCondition = nome ? { descricao: { [Op.like]: `%${nome}%` } }: {};

    const response = await PromocaoRepository.listarPromocoesPorDescricao(whereCondition)
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

  async updatePromocao(id, promocaoData) {
    return await PromocaoRepository.update(id, promocaoData);
  }

  async desativarPromocao(id) {
    const promocao = await PromocaoRepository.findById(id);
    promocao.sn_ativo = "N";
    await PromocaoRepository.update(promocao.id, promocao);

    return promocao;
  }
}

module.exports = new PromocaoService();