const ItemService = require('../../services/ItemService');

class CatalogoController {
  async openCatalogoPage(req, res) {
    try {
      const items = await ItemService.listarItensAtivos();

      return res.render('layout', { body: './partials/Operacoes/CatalogoPage.ejs' , items : items, title : "CATÁLOGO"})
    } catch (error) {
      return res.json({ error: error.message });
    }
  }
}

module.exports = new CatalogoController();
