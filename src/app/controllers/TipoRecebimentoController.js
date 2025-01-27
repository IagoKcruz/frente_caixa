const TipoRecebimentoService = require('../services/TipoRecebimentoService');

class TipoRecebimentoController {
  constructor() {
    this.tipoRecebimentoService = new TipoRecebimentoService();
  }

  async index(req, res) {
    const tiposRecebimento = await this.tipoRecebimentoService.getAllTiposRecebimento();
    res.json(tiposRecebimento);
  }

  async show(req, res) {
    const tipoRecebimento = await this.tipoRecebimentoService.getTipoRecebimentoById(req.params.id);
    res.json(tipoRecebimento);
  }

  async store(req, res) {
    const tipoRecebimento = await this.tipoRecebimentoService.createTipoRecebimento(req.body);
    res.status(201).json(tipoRecebimento);
  }

  async update(req, res) {
    const tipoRecebimento = await this.tipoRecebimentoService.updateTipoRecebimento(req.params.id, req.body);
    res.json(tipoRecebimento);
  }

  async destroy(req, res) {
    await this.tipoRecebimentoService.deleteTipoRecebimento(req.params.id);
    res.status(204).send();
  }
}

module.exports = new TipoRecebimentoController();
