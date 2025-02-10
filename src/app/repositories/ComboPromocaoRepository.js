const ComboPromocao = require('../models/ComboPromocao');
const BasicRepository = require('./BasicRepository');

class ComboPromocaoRepository extends BasicRepository {
  constructor() {
    super(ComboPromocao);
  }

  async verificarSePromoTemComboPromo(promoId){
    const combo = await ComboPromocao.findOne({
        where: { promocaoId: promoId }
    });

    return combo;
  }
}

module.exports = new ComboPromocaoRepository();