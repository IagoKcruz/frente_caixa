const Municipio = require('../models/Municipio');
const BasicRepository = require('./BasicRepository');
const { Op } = require("sequelize");

class MunicipioRepository extends BasicRepository {
  constructor() {
    super(Municipio);
  }

  async GetlistarMunicipios(nome){
    return await Municipio.findAll({where : { descricao: { [Op.like]: `%${nome}%` } }})
  }
}
module.exports = new MunicipioRepository();
