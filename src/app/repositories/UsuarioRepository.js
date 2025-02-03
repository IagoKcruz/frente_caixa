const BaseRepository = require('./BasicRepository');
const Usuario = require('../models/Usuario');

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