const { ComboPromocao } = require('../models');

class ComboPromocaoRepository {
  async findAll() {
    return await ComboPromocao.findAll({ include: 'promocao' });
  }

  async findById(id) {
    return await ComboPromocao.findByPk(id, { include: 'promocao' });
  }

  async create(comboData) {
    return await ComboPromocao.create(comboData);
  }

  async update(id, comboData) {
    const combo = await ComboPromocao.findByPk(id);
    if (!combo) throw new Error('Combo de promoção não encontrado');
    return await combo.update(comboData);
  }

  async delete(id) {
    const combo = await ComboPromocao.findByPk(id);
    if (!combo) throw new Error('Combo de promoção não encontrado');
    return await combo.destroy();
  }
}

module.exports = new ComboPromocaoRepository();