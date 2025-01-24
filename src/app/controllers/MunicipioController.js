const { MunicipioService } = require('../services/service');

class MunicipioController {
  async listar(req, res) {
    try {
      const municipios = await MunicipioService.listarMunicipios();
      return res.status(200).json(municipios);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async criar(req, res) {
    try {
      const { descricao } = req.body;
      const novoMunicipio = await MunicipioService.criarMunicipio({ descricao });
      return res.status(201).json(novoMunicipio);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const municipio = await MunicipioService.buscarMunicipioPorId(id);
      if (!municipio) return res.status(404).json({ error: 'Município não encontrado' });
      return res.status(200).json(municipio);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const atualizacoes = req.body;

      const municipioAtualizado = await MunicipioService.atualizarMunicipio(id, atualizacoes);
      return res.status(200).json(municipioAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await MunicipioService.deletarMunicipio(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new MunicipioController();
