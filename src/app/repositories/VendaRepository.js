const BaseRepository = require('./BaseRepository');
const Venda = require('../models/Venda');

class VendaRepository extends BaseRepository {
  constructor() {
    super(Venda);
  }

  // Exemplo de método customizado
  async findByCliente(clienteId) {
    return await this.model.findAll({
      where: { cliente_id: clienteId },
      include: ['cliente'],
    });
  }
}

module.exports = new VendaRepository();