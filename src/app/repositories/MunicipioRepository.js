const Municipio = require('../models/Municipio');

class MunicipioRepository {
  async listarMunicipios() {
    return await Municipio.findAll();
  }

  async criarMunicipio(dados) {
    return await Municipio.create(dados);
  }

  async buscarMunicipioPorId(id) {
    return await Municipio.findByPk(id);
  }

  async atualizarMunicipio(id, atualizacoes) {
    const municipio = await Municipio.findByPk(id);
    if (!municipio) throw new Error('Município não encontrado');
    return await municipio.update(atualizacoes);
  }

  async deletarMunicipio(id) {
    const municipio = await Municipio.findByPk(id);
    if (!municipio) throw new Error('Município não encontrado');
    return await municipio.destroy();
  }
}

module.exports = new MunicipioRepository();
