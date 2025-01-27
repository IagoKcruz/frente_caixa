const RecebimentoVendaService = require('../services/RecebimentoVendaService');

class RecebimentoVendaController {
  constructor() {
    this.recebimentoVendaService = new RecebimentoVendaService();
  }

  async index(req, res) {
    const recebimentosVenda = await this.recebimentoVendaService.getAllRecebimentosVenda();
    res.json(recebimentosVenda);
  }

  async show(req, res) {
    const recebimentoVenda = await this.recebimentoVendaService.getRecebimentoVendaById(req.params.id);
    res.json(recebimentoVenda);
  }

  async store(req, res) {
    const recebimentoVenda = await this.recebimentoVendaService.createRecebimentoVenda(req.body);
    res.status(201).json(recebimentoVenda);
  }

  async update(req, res) {
    const recebimentoVenda = await this.recebimentoVendaService.updateRecebimentoVenda(req.params.id, req.body);
    res.json(recebimentoVenda);
  }

  async destroy(req, res) {
    await this.recebimentoVendaService.deleteRecebimentoVenda(req.params.id);
    res.status(204).send();
  }
}

module.exports = new RecebimentoVendaController();
