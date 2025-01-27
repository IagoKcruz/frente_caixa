const CategoriaService = require('../services/CategoriaService');

class CategoriaController {
  constructor() {
    this.categoriaService = new CategoriaService();
  }

  async index(req, res) {
    const categorias = await this.categoriaService.getAllCategorias();
    res.json(categorias);
  }

  async show(req, res) {
    const categoria = await this.categoriaService.getCategoriaById(req.params.id);
    res.json(categoria);
  }

  async store(req, res) {
    const categoria = await this.categoriaService.createCategoria(req.body);
    res.status(201).json(categoria);
  }

  async update(req, res) {
    const categoria = await this.categoriaService.updateCategoria(req.params.id, req.body);
    res.json(categoria);
  }

  async destroy(req, res) {
    await this.categoriaService.deleteCategoria(req.params.id);
    res.status(204).send();
  }
}

module.exports = new CategoriaController();
