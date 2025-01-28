const TipoRecebimentoRepository = require('../repositories/TipoOperacaoRepository');

class TipoRecebimentoService {
  constructor() {
    this.tipoRecebimentoRepository = new TipoRecebimentoRepository();
  }

  async getAllTiposRecebimento() {
    return this.tipoRecebimentoRepository.findAll();
  }

  async getTipoRecebimentoById(id) {
    return this.tipoRecebimentoRepository.findById(id);
  }

  async createTipoRecebimento(data) {
    return this.tipoRecebimentoRepository.create(data);
  }

  async updateTipoRecebimento(id, data) {
    return this.tipoRecebimentoRepository.update(id, data);
  }

  async deleteTipoRecebimento(id) {
    return this.tipoRecebimentoRepository.delete(id);
  }
}

module.exports = TipoRecebimentoService;
