const BaseRepository = require('./BasicRepository');
const Usuario = require('../models/Usuario');

class UsuarioRepository extends BaseRepository {
  constructor() {
    super(Usuario);
  }
}

module.exports = UsuarioRepository;