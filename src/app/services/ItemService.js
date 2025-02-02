const ItemRepository = require('../repositories/ItemRepository');

class ItemService {
  async listarItens() {
    return await ItemRepository.findAll({ include: ['categoria', 'unidade_medida'] });
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
}

module.exports = new ItemService();