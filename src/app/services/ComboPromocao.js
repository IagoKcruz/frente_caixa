const ComboPromocaoRepository = require('../repositories/ComboPromocaoRepository.js');

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

  async atualizarCombo(id, comboData) {
    return await ComboPromocaoRepository.update(id, comboData);
  }

  async deletarCombo(id) {
    return await ComboPromocaoRepository.delete(id);
  }
}

module.exports = new ComboPromocaoService();    