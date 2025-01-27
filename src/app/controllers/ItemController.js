const ItemService = require('../services/ItemService');

class ItemController {
  async listar(req, res) {
    try {
      const itens = await ItemService.listarItens();
      return res.status(200).json(itens);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const item = await ItemService.buscarItemPorId(id);
      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async criar(req, res) {
    try {
      const data = req.body;
      const item = await ItemService.criarItem(data);
      return res.status(201).json(item);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const item = await ItemService.atualizarItem(id, updates);
      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const item = await ItemService.deletarItem(id);
      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ItemController();