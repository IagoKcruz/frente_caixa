const UsuarioRepository = require('../repositories/UsuarioRepository.js');

class UsuarioService {
  async getAllUsuarios(nome) {
    return await UsuarioRepository.findAllWithFiltro(nome);
  }

  async findUserByEmail(email) {
    return await UsuarioRepository.findUserByEmail(email);
  }

  async getUsuarioById(id) {
    return await UsuarioRepository.findById(id);
  }

  async createUsuario(data) {
    return await UsuarioRepository.create(data);
  }

  async updateUsuario(id, data) {
    return await UsuarioRepository.update(id, data);
  }

  async deleteUsuario(id) {
    return await UsuarioRepository.delete(id);
  }
}

module.exports = new UsuarioService();