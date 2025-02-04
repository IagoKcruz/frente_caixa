const Municipio = require('../models/Municipio');
const BasicRepository = require('./BasicRepository');

class MunicipioRepository extends BasicRepository {
  constructor() {
    super(Municipio);
  }

  async GetlistarMunicipios(whereCondition){
    await this.findAll({where : whereCondition})
  }
}
module.exports = new MunicipioRepository();
