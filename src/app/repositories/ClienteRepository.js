const { Cliente } = require('../models/Cliente.js');
const BasicRepository = require('./BasicRepository.js');

class ClienteRepository extends BasicRepository {
  constructor() {
    super(Cliente);
  }
}

module.exports = new ClienteRepository();