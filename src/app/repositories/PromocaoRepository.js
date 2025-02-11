const Promocao = require('../models/Promocao');
const ComboPromocao = require('../models/ComboPromocao');
const BasicRepository = require('./BasicRepository');

class PromocaoRepository extends BasicRepository {
  constructor() {
    super(Promocao);
  }

  async findAllComInclude(nome){
    return await Promocao.findAll({
      include: [{
        model: ComboPromocao,
        as: 'combos_promocao', // alias definido no relacionamento hasMany
      }],
      where : [
        { descricao: { [Op.like]: `%${nome}%` } }
      ]
    });
  }

  async listarPromocoesPorDescricao(nome){
    return await this.findAllComInclude(nome)
  }
}

module.exports = new PromocaoRepository();