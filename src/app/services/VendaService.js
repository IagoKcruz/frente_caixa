const VendaRepository = require('../repositories/VendaRepository');

class VendaService {
  async listarVendas() {
    return await VendaRepository.findAll({ include: ['cliente'] });
  }

  async buscarVendaPorId(id) {
    return await VendaRepository.findById(id);
  }

  async buscarVendasPorCliente(clienteId) {
    return await VendaRepository.findByCliente(clienteId);
  }

  async criarVenda(data) {
    return await VendaRepository.create(data);
  }

  async atualizarVenda(id, updates) {
    return await VendaRepository.update(id, updates);
  }

  async deletarVenda(id) {
    return await VendaRepository.delete(id);
  }
}

module.exports = new VendaService();
