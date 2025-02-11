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
      await ComboPromocaoRepository.update(comboData);
  }

  async verificaSeItemJaEstaNapromocao(promocao_id, item_id){
    const comboPromocao = await ComboPromocaoRepository.verificaSeItemJaEstaNapromocao(promocao_id, item_id);
    console.log(comboPromocao)
    if(comboPromocao != null){
      return true;
    }else{
      return false;
    }
  }

  async deletarCombo(id) {
    const comboPromocao = await ComboPromocaoRepository.findById(id);
    console.log(comboPromocao)
    if(comboPromocao != null){
      return await ComboPromocaoRepository.delete(comboPromocao);
    }else{
      return null;
    }
  }
}

module.exports = new ComboPromocaoService();    