const { Cliente } = require('../models/Cliente.js');
const BasicRepository = require('./BasicReposiroty.js');

class ClienteRepository extends BasicRepository {
  constructor() {
    super(Cliente);
  }
}

module.exports = new ClienteRepository();