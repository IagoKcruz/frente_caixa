const BasicRepository = require('./BasicRepository');
const SysLogRegistro = require('../models/SysLogRegistro');

class SysLogRegistroRepository extends BasicRepository {
  constructor() {
    super(SysLogRegistro);
  }
}

module.exports = SysLogRegistroRepository;
