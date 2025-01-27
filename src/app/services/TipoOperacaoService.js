const TipoOperacaoRepository = require('../repositories/TipoOperacaoRepository');

class TipoOperacaoService {
  constructor() {
    this.tipoOperacaoRepository = new TipoOperacaoRepository();
  }

  async getAllTipoOperacoes() {
    return this.tipoOperacaoRepository.findAll();
  }

  async getTipoOperacaoById(id) {
    return this.tipoOperacaoRepository.findById(id);
  }

  async createTipoOperacao(data) {
    return this.tipoOperacaoRepository.create(data);
  }

  async updateTipoOperacao(id, data) {
    return this.tipoOperacaoRepository.update(id, data);
  }

  async deleteTipoOperacao(id) {
    return this.tipoOperacaoRepository.delete(id);
  }
}

module.exports = TipoOperacaoService;
