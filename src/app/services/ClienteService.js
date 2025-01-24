const ClienteRepository = require('../repositories/ClienteRepository');

class ClienteService {
  async listarClientes() {
    return await ClienteRepository.findAll();
  }

  async buscarClientePorId(id) {
    return await ClienteRepository.findById(id);
  }

  async criarCliente(clienteData) {
    return await ClienteRepository.create(clienteData);
  }

  async atualizarCliente(id, clienteData) {
    return await ClienteRepository.update(id, clienteData);
  }

  async deletarCliente(id) {
    return await ClienteRepository.delete(id);
  }
}

module.exports = new ClienteService();