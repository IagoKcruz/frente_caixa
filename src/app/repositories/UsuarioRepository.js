const Usuario = require('../models/Usuario.js');
const BaseRepository = require('./BasicRepository.js');

class UsuarioRepository extends BaseRepository {
  constructor() {
    super(Usuario);
  }

  async countByEmail(email){
    const count = await Usuario.count({
      where: { email: email }
    });

    return count;
  }
}

module.exports = new UsuarioRepository();