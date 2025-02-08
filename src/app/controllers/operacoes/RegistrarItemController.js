const { v4: uuidv4 } = require('uuid');
const ItemService = require('../../services/ItemService');
const gerarCodigoUnico = require('../../utilsBack/CodeGenerator');
const CategoriaService = require('../../services/CategoriaService');
const UnidadeMedidaService = require('../../services/UnidadeMedidaService');

class ItemController {
  async listar(req, res) {
    try {
      const itens = await ItemService.listarItens();
      return res.status(200).json(itens);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async openRegistrarItem(req, res) {
    try {
      const categoria = await CategoriaService.getAllCategorias();
      const unidadeMedida = await UnidadeMedidaService.getAllUnidadesMedida();

      return res.render('layout', { body: './partials/Operacoes/RegistrarItemPage.ejs', UnidadeMedida : unidadeMedida, Categoria: categoria})
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async criarItem(req, res) {
    console.log(req.body);
    try {
      const {
        categoria_id,
        unidade_medida_id,
        saldo_estoque_atual,
        registrar_comissao,
        sn_ativo,
        descricao,
        preco
      } = req.body;

      const id = uuidv4();
      const codigo = gerarCodigoUnico("I");
      const codigo_de_barra = gerarCodigoUnico("CBI", 16);
      
      await ItemService.criarItem({
        id,
        codigo,
        codigo_de_barra,
        categoria_id,
        unidade_medida_id,
        saldo_estoque_atual,
        registrar_comissao,
        sn_ativo,
        descricao,
        preco
      });
      
      return res.json({ ok: true });
    } catch (error) {
      return res.json({ erro: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const item = await ItemService.buscarItemPorId(id);
      if (!item) return res.status(404).json({ error: 'Item não encontrado' });
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async atualizarItem(req, res) {
    try {
      const { id } = req.params;
      const atualizacoes = req.body;

      const itemAtualizado = await ItemService.atualizarItem(id, atualizacoes);
      return res.status(200).json(itemAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deletarItem(req, res) {
    try {
      const { id } = req.params;
      await ItemService.deletarItem(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ItemController();
