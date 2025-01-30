const ItemVendaService = require('../../services/ItemVendaService');

class ItemVendaController {
  constructor() {
    this.itemVendaService = new ItemVendaService();
  }

  async index(req, res) {
    const itemVendas = await this.itemVendaService.getAllItemVendas();
    res.json(itemVendas);
  }

  async show(req, res) {
    const itemVenda = await this.itemVendaService.getItemVendaById(req.params.id);
    res.json(itemVenda);
  }

  async store(req, res) {
    const itemVenda = await this.itemVendaService.createItemVenda(req.body);
    res.status(201).json(itemVenda);
  }

  async update(req, res) {
    const itemVenda = await this.itemVendaService.updateItemVenda(req.params.id, req.body);
    res.json(itemVenda);
  }

  async destroy(req, res) {
    await this.itemVendaService.deleteItemVenda(req.params.id);
    res.status(204).send();
  }
}

module.exports = new ItemVendaController();
