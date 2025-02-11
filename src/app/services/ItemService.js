const ItemRepository = require('../repositories/ItemRepository');

class ItemService {
  async listarItens() {
    return await ItemRepository.findAll({ include: ['categoria', 'unidade_medida'] });
  }
  async listarItensAtivos() {
    return await ItemRepository.findAll({ 
      include: ['categoria', 'unidade_medida'],
      where : [{sn_ativo : "S"}]
    });
  }

  async buscarItemPorId(id) {
    return await ItemRepository.findById(id);
  }

  async buscarItemPorCodigo(codigo) {
    return await ItemRepository.findByCodigo(codigo);
  }

  async criarItem(data) {
    return await ItemRepository.create(data);
  }

  async atualizarItem(id, updates) {
    return await ItemRepository.update(id, updates);
  }

  async deletarItem(id) {
    return await ItemRepository.delete(id);
  }

  async listarItemCombo(){
    return await ItemRepository.findAllToCombo();
  }
}

module.exports = new ItemService();