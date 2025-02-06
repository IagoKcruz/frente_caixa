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

  async update(municipioDto) {
    return await MunicipioRepository.update(municipioDto)
  }

  async delete(id) {
    const municipio = await MunicipioRepository.findById(id)
    if(municipio == null){
        throw new Error("Erro ao achar Municipio para excluir");
    }
    return await MunicipioRepository.delete(municipio)
  }
}

module.exports = new MunicipioService();