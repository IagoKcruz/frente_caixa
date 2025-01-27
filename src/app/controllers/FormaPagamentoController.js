const FormaPagamentoService = require('../services/FormaPagamentoService');

class FormaPagamentoController {
  constructor() {
    this.formaPagamentoService = new FormaPagamentoService();
  }

  async index(req, res) {
    const formasPagamento = await this.formaPagamentoService.getAllFormasPagamento();
    res.json(formasPagamento);
  }

  async show(req, res) {
    const formaPagamento = await this.formaPagamentoService.getFormaPagamentoById(req.params.id);
    res.json(formaPagamento);
  }

  async store(req, res) {
    const formaPagamento = await this.formaPagamentoService.createFormaPagamento(req.body);
    res.status(201).json(formaPagamento);
  }

  async update(req, res) {
    const formaPagamento = await this.formaPagamentoService.updateFormaPagamento(req.params.id, req.body);
    res.json(formaPagamento);
  }

  async destroy(req, res) {
    await this.formaPagamentoService.deleteFormaPagamento(req.params.id);
    res.status(204).send();
  }
}

module.exports = new FormaPagamentoController();
