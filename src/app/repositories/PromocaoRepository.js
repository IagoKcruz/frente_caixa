const { Promocao } = require('../models');

class PromocaoRepository {
  async findAll() {
    return await Promocao.findAll();
  }

  async findById(id) {
    return await Promocao.findByPk(id, { include: 'combos' });
  }

  async create(promocaoData) {
    return await Promocao.create(promocaoData);
  }

  async update(id, promocaoData) {
    const promocao = await Promocao.findByPk(id);
    if (!promocao) throw new Error('Promoção não encontrada');
    return await promocao.update(promocaoData);
  }

  async delete(id) {
    const promocao = await Promocao.findByPk(id);
    if (!promocao) throw new Error('Promoção não encontrada');
    return await promocao.destroy();
  }
}

module.exports = new PromocaoRepository();