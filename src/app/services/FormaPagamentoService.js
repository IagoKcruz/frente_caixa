const FormaPagamentoRepository = require('../repositories/FormaPagamentoRepository');

class FormaPagamentoService {
  async getAllFormasPagamento(descricao) {
    return await FormaPagamentoRepository.getAllFormasPagamento(descricao);
  }

  async getFormaPagamentoById(id) {
    return await FormaPagamentoRepository.findById(id);
  }

  async createFormaPagamento(data) {
    confirm.log(data)
    return await FormaPagamentoRepository.create(data);
  }

  async updateFormaPagamento(data) {
    return await FormaPagamentoRepository.update(data);
  }

  async deleteFormaPagamento(id) {
    const formaPagamento = await this.findById(id)
    return await FormaPagamentoRepository.delete(formaPagamento);
  }
}

module.exports = new FormaPagamentoService();
