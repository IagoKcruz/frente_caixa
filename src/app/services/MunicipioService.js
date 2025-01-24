const MunicipioRepository = require('../repositories/MunicipioRepository');

class MunicipioService {
  async listarMunicipios() {
    return await MunicipioRepository.listarMunicipios();
  }

  async criarMunicipio(dados) {
    return await MunicipioRepository.criarMunicipio(dados);
  }

  async buscarMunicipioPorId(id) {
    return await MunicipioRepository.buscarMunicipioPorId(id);
  }

  async atualizarMunicipio(id, atualizacoes) {
    return await MunicipioRepository.atualizarMunicipio(id, atualizacoes);
  }

  async deletarMunicipio(id) {
    return await MunicipioRepository.deletarMunicipio(id);
  }
}

module.exports = new MunicipioService();