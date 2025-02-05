const MunicipioRepository = require('../repositories/MunicipioRepository');

class MunicipioService {
  
  async GetlistarMunicipios(nome){
    let whereCondition = nome ? { descricao: { [Op.like]: `%${nome}%` } }: {};

    const response = await MunicipioRepository.GetlistarMunicipios(whereCondition)
    return response;
  }

  async listarMunicipios() {
    return await MunicipioRepository.findAll();
  }

  async create(municipioDto) {
    return await MunicipioRepository.create(municipioDto);
  }
}

module.exports = new MunicipioService();