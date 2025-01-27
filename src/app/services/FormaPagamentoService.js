const FormaPagamentoRepository = require('../repositories/FormaPagamentoRepository');

class FormaPagamentoService {
  constructor() {
    this.formaPagamentoRepository = new FormaPagamentoRepository();
  }

  async getAllFormasPagamento() {
    return this.formaPagamentoRepository.findAll({
      include: ['tipoRecebimento'],
    });
  }

  async getFormaPagamentoById(id) {
    return this.formaPagamentoRepository.findById(id);
  }

  async createFormaPagamento(data) {
    return this.formaPagamentoRepository.create(data);
  }

  async updateFormaPagamento(id, data) {
    return this.formaPagamentoRepository.update(id, data);
  }

  async deleteFormaPagamento(id) {
    return this.formaPagamentoRepository.delete(id);
  }
}

module.exports = FormaPagamentoService;
