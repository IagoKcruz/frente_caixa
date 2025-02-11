const Promocao = require('../models/Promocao');
const ComboPromocao = require('../models/ComboPromocao');
const BasicRepository = require('./BasicRepository');

class PromocaoRepository extends BasicRepository {
  constructor() {
    super(Promocao);
  }

  async findAllComInclude(nome) {
    const whereClause = nome ?
      { descricao: { [Op.like]: `%${nome}%` } } :
      {}; // Se não houver 'nome', a cláusula where será um objeto vazio, trazendo todos.

    return await Promocao.findAll({
      include: [{
        model: ComboPromocao,
        as: 'combos_promocao', // alias definido no relacionamento hasMany
      }],
      where: whereClause
    });
  }

  async listarPromocoesPorDescricao(nome) {
    return await this.findAllComInclude(nome)
  }
}

module.exports = new PromocaoRepository();