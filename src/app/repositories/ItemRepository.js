const BasicRepository = require('./BasicRepository');
const Item = require('../models/Item');
const { Sequelize, Op } = require('sequelize');

class ItemRepository extends BasicRepository {
  constructor() {
    super(Item);
  }

  // Exemplo de método customizado
  async findByCodigo(codigo) {
    return await Item.findOne({ where: { codigo } });
  }

  async findAllToCombo(){
    return await Item.findAll({ attributes: [
        "id" ,
        [Sequelize.literal("CONCAT(preco, ' - ', descricao)"),"descricao"], 
        "preco"
    ] })
  }
}

module.exports = new ItemRepository();