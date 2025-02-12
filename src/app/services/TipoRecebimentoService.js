const TipoRecebimentoRepository = require('../repositories/TipoRecebimento.js');

class TipoRecebimentoService {
  async getAllTiposRecebimento() {
    console.log("aqui")
    const tipos = await TipoRecebimentoRepository.findAll();
    console.log(tipos)
    return tipos
  }

  async getTipoRecebimentoById(id) {
    return await TipoRecebimentoRepository.findById(id);
  }

  async createTipoRecebimento(data) {
    return await TipoRecebimentoRepository.create(data);
  }

  async updateTipoRecebimento(id, data) {
    return await TipoRecebimentoRepository.update(id, data);
  }

  async deleteTipoRecebimento(id) {
    return await TipoRecebimentoRepository.delete(id);
  }
}

module.exports = new TipoRecebimentoService();
