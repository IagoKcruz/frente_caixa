const { Cliente } = require('../models/Cliente.js');

class ClienteRepository {
  async findAll() {
    return await Cliente.findAll({ include: ['municipio', 'promocao'] });
  }

  async findById(id) {
    return await Cliente.findByPk(id, { include: ['municipio', 'promocao'] });
  }

  async create(clienteData) {
    return await Cliente.create(clienteData);
  }

  async update(id, clienteData) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error('Cliente não encontrado');
    return await cliente.update(clienteData);
  }

  async delete(id) {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) throw new Error('Cliente não encontrado');
    return await cliente.destroy();
  }
}

module.exports = new ClienteRepository();