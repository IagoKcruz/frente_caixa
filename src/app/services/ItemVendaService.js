const ItemVendaRepository = require('../repositories/ItemVendaRepository');

class ItemVendaService {
  constructor() {
    this.itemVendaRepository = new ItemVendaRepository();
  }

  async getAllItemVendas() {
    return this.itemVendaRepository.findAll({
      include: ['item', 'venda', 'usuario'],
    });
  }

  async getItemVendaById(id) {
    return this.itemVendaRepository.findById(id);
  }

  async createItemVenda(data) {
    return this.itemVendaRepository.create(data);
  }

  async updateItemVenda(id, data) {
    return this.itemVendaRepository.update(id, data);
  }

  async deleteItemVenda(id) {
    return this.itemVendaRepository.delete(id);
  }
}

module.exports = ItemVendaService;
