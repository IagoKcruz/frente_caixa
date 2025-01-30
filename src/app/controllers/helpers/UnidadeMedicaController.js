const UnidadeMedidaService = require('../../services/UnidadeMedidaService');

class UnidadeMedidaController {
  constructor() {
    this.unidadeMedidaService = new UnidadeMedidaService();
  }

  async index(req, res) {
    const unidadesMedida = await this.unidadeMedidaService.getAllUnidadesMedida();
    res.json(unidadesMedida);
  }

  async show(req, res) {
    const unidadeMedida = await this.unidadeMedidaService.getUnidadeMedidaById(req.params.id);
    res.json(unidadeMedida);
  }

  async store(req, res) {
    const unidadeMedida = await this.unidadeMedidaService.createUnidadeMedida(req.body);
    res.status(201).json(unidadeMedida);
  }

  async update(req, res) {
    const unidadeMedida = await this.unidadeMedidaService.updateUnidadeMedida(req.params.id, req.body);
    res.json(unidadeMedida);
  }

  async destroy(req, res) {
    await this.unidadeMedidaService.deleteUnidadeMedida(req.params.id);
    res.status(204).send();
  }
}

module.exports = new UnidadeMedidaController();
