const TipoOperacaoService = require('../services/TipoOperacaoService');

class TipoOperacaoController {
  constructor() {
    this.tipoOperacaoService = new TipoOperacaoService();
  }

  async index(req, res) {
    const tipoOperacoes = await this.tipoOperacaoService.getAllTipoOperacoes();
    res.json(tipoOperacoes);
  }

  async show(req, res) {
    const tipoOperacao = await this.tipoOperacaoService.getTipoOperacaoById(req.params.id);
    res.json(tipoOperacao);
  }

  async store(req, res) {
    const tipoOperacao = await this.tipoOperacaoService.createTipoOperacao(req.body);
    res.status(201).json(tipoOperacao);
  }

  async update(req, res) {
    const tipoOperacao = await this.tipoOperacaoService.updateTipoOperacao(req.params.id, req.body);
    res.json(tipoOperacao);
  }

  async destroy(req, res) {
    await this.tipoOperacaoService.deleteTipoOperacao(req.params.id);
    res.status(204).send();
  }
}

module.exports = new TipoOperacaoController();
