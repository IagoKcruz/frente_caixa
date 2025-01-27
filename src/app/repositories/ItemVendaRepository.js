const ItemVenda = require('../models/ItemVenda');
const BasicRepository = require('./BasicReposiroty');

class ItemVendaRepository extends BasicRepository {
  constructor() {
    super(ItemVenda);
  }
}

module.exports = ItemVendaRepository;