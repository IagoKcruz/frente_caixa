const MunicipioRepository = require('../repositories/MunicipioRepository');

class MunicipioService {
  async listarMunicipios(nome){
    const whereCondition = nome
      ? { descricao: { [Op.like]: `%${nome}%` } }
      : {};
    const response = await MunicipioRepository.GetlistarMunicipios(whereCondition)
    return response;
  }

  async listarMunicipios() {
    return await MunicipioRepository.findAll();
  }
}

module.exports = new MunicipioService();