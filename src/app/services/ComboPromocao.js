const ComboPromocaoRepository = require('../repositories/ComboPromocaoRepository.js');
const PromocaoRepository = require('../repositories/PromocaoRepository.js');

class ComboPromocaoService {
  async listarCombos() {
    return await ComboPromocaoRepository.findAll();
  }

  async buscarComboPorId(id) {
    return await ComboPromocaoRepository.findById(id);
  }

  async criarCombo(comboData) {
    return await ComboPromocaoRepository.create(comboData);
  }

  async atualizarCombo(comboData) {
    let promocao;
    const comboPromocaoAntigo = await PromocaoRepository.findById(comboData.id);

    if (comboPromocaoAntigo) {
      const valorFinalAntigo = comboPromocaoAntigo.valor_promocao;

      await ComboPromocaoRepository.update(comboData.id, comboData);
      // Verificar se o valor_final_promocao mudou
      if (valorFinalAntigo !== comboData.valor_promocao) {
        promocao = await this.getPromocao(comboData.promocao_id)
        this.atualizarValorPromocao(promocao, valorFinalAntigo, comboData);
      }
    }else{
      throw new Error("ComboPromocao não encontrada existe")
    }
  }

  atualizarValorPromocao(promocao, valorFinalAntigo, comboData) {
    const valorAtual = promocao.valor_final;

    let valorAlterado = (valorAtual - valorFinalAntigo) + comboData.valor_promocao;
    promocao.valor_final = valorAlterado;

    PromocaoRepository.update(promocao.id, promocao)
  }

  async deletarCombo(id) {
    const comboPromocao = await ComboPromocaoService.getById(id);

    if (!comboPromocao) {
      throw new Error("ComboPromocao não existe")
    }

    const promocao = await this.getPromocao(comboPromocao.promocao_id)
    this.atualizarValorPromocao(promocao, 0, comboPromocao);

    return await ComboPromocaoRepository.delete(id);
  }

  async getPromocao(promocao_id) {
    const promocao = await PromocaoService.getById(promocao_id);

    if (promocao) {
      return promocao;
    } else {
      throw new Error("Promoção não encontrada")
    }
  }
}

module.exports = new ComboPromocaoService();    