const Municipio = require('../models/Municipio');
const BasicRepository = require('./BasicRepository');

class MunicipioRepository extends BasicRepository {
  constructor() {
    super(Cliente);
  }
}
module.exports = new MunicipioRepository();
