const UsuarioService = require('../../services/UsuarioService');

class UsuarioController {
  constructor() {
    this.usuarioService = new UsuarioService();
  }

  async index(req, res) {
    const usuarios = await this.usuarioService.getAllUsuarios();
    res.json(usuarios);
  }

  async show(req, res) {
    const usuario = await this.usuarioService.getUsuarioById(req.params.id);
    res.json(usuario);
  }

  async store(req, res) {
    const usuario = await this.usuarioService.createUsuario(req.body);
    res.status(201).json(usuario);
  }

  async update(req, res) {
    const usuario = await this.usuarioService.updateUsuario(req.params.id, req.body);
    res.json(usuario);
  }

  async destroy(req, res) {
    await this.usuarioService.deleteUsuario(req.params.id);
    res.status(204).send();
  }
}

module.exports = new UsuarioController();
