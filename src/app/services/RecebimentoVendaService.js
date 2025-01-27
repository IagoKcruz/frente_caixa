const RecebimentoVendaRepository = require('../repositories/RecebimentoVendaRepository');

class RecebimentoVendaService {
  constructor() {
    this.recebimentoVendaRepository = new RecebimentoVendaRepository();
  }

  async getAllRecebimentosVenda() {
    return this.recebimentoVendaRepository.findAll({
      include: ['venda', 'formaPagamento'],
    });
  }

  async getRecebimentoVendaById(id) {
    return this.recebimentoVendaRepository.findById(id);
  }

  async createRecebimentoVenda(data) {
    return this.recebimentoVendaRepository.create(data);
  }

  async updateRecebimentoVenda(id, data) {
    return this.recebimentoVendaRepository.update(id, data);
  }

  async deleteRecebimentoVenda(id) {
    return this.recebimentoVendaRepository.delete(id);
  }
}

module.exports = RecebimentoVendaService;
