const Usuario = require('../models/Usuario.js');
const BaseRepository = require('./BasicRepository.js');
const { Op } = require('sequelize');

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

  async findAllWithFiltro(nome){
    const whereClause = nome ?
    { nome: { [Op.like]: `%${nome}%` } } :
    {};

    return await Usuario.findAll({
      where: whereClause
    });
  }
}

module.exports = new UsuarioRepository();