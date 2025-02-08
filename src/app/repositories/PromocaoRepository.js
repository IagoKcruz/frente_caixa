const Promocao = require('../models/Promocao');
const ComboPromocao = require('../models/ComboPromocao');
const BasicRepository = require('./BasicRepository');

class PromocaoRepository extends BasicRepository {
  constructor() {
    super(Promocao);
  }

  async findAllComInclude(){
    return await Promocao.findAll({
      include: [{
        model: ComboPromocao,
        as: 'combos_promocao', // alias definido no relacionamento hasMany
      }]
    });
  }

  async listarPromocoesPorDescricao(whereCondition){
    return await this.findAllComInclude(whereCondition)
  }
}

module.exports = new PromocaoRepository();