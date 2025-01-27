const BasicRepository = require('./BasicRepository');
const Item = require('../models/Item');

class ItemRepository extends BasicRepository {
  constructor() {
    super(Item);
  }

  // Exemplo de método customizado
  async findByCodigo(codigo) {
    return await this.model.findOne({ where: { codigo } });
  }
}

module.exports = new ItemRepository();