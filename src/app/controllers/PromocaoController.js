const { PromocaoService } = require('../services/PromocaoService');

class PromocaoController {
  async listar(req, res) {
    try {
      const promocoes = await PromocaoService.listarPromocoes();
      return res.status(200).json(promocoes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async criar(req, res) {
    try {
      const { descricao } = req.body;
      const novaPromocao = await PromocaoService.criarPromocao({ descricao });
      return res.status(201).json(novaPromocao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const promocao = await PromocaoService.buscarPromocaoPorId(id);
      if (!promocao) return res.status(404).json({ error: 'Promoção não encontrada' });
      return res.status(200).json(promocao);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { descricao } = req.body;
      const promocaoAtualizada = await PromocaoService.atualizarPromocao(id, { descricao });
      return res.status(200).json(promocaoAtualizada);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await PromocaoService.deletarPromocao(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PromocaoController();