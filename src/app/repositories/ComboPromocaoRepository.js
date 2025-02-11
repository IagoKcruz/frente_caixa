const ComboPromocao = require('../models/ComboPromocao');
const BasicRepository = require('./BasicRepository');
const { Op } = require('sequelize');

class ComboPromocaoRepository extends BasicRepository {
  constructor() {
    super(ComboPromocao);
  }

  async verificarSePromoTemComboPromo(promoId){
    const combo = await ComboPromocao.findOne({
        where: { promocao_id: promoId }
    });

    return combo;
  }

  async verificaSeItemJaEstaNapromocao(promocao_id, item_id){
    const combo = await ComboPromocao.findOne({
      where:{[Op.and]: [
          { promocao_id: promocao_id },
          { item_id: item_id }
        ]
      }
    });

    return combo;
  }
}

module.exports = new ComboPromocaoRepository();