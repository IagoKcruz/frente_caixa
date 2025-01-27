const ItemVenda = require('../models/ItemVenda');
const BasicRepository = require('./BasicRepository');

class ItemVendaRepository extends BasicRepository {
  constructor() {
    super(ItemVenda);
  }
}

module.exports = ItemVendaRepository;