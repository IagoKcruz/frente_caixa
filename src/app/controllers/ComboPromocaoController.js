const ComboPromocaoService= require('../services/ComboPromocao');

class ComboPromocaoController {
  async listar(req, res) {
    try {
      const combos = await ComboPromocaoService.listarComboPromocoes();
      return res.status(200).json(combos);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async criar(req, res) {
    try {
      const { valor_promocao, item_id } = req.body;

      const novoCombo = await ComboPromocaoService.criarComboPromocao({
        valor_promocao,
        item_id,
      });

      return res.status(201).json(novoCombo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const combo = await ComboPromocaoService.buscarComboPromocaoPorId(id);
      if (!combo) return res.status(404).json({ error: 'Combo promoção não encontrado' });
      return res.status(200).json(combo);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const atualizacoes = req.body;

      const comboAtualizado = await ComboPromocaoService.atualizarComboPromocao(id, atualizacoes);
      return res.status(200).json(comboAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await ComboPromocaoService.deletarComboPromocao(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ComboPromocaoController();
