const ClienteService = require('../services/ClienteService');

class ClienteController {
  async listar(req, res) {
    try {
      const clientes = await ClienteService.listarClientes();
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async criar(req, res) {
    try {
      const {
        nome,
        codigo,
        cnpj_cpf,
        rg,
        data_nascimento,
        email,
        bairro,
        numero_logradouro,
        logradouro,
        inscricao_estadual,
        municipio_id,
        promocao_id,
        sn_ativo,
      } = req.body;

      const novoCliente = await ClienteService.criarCliente({
        nome,
        codigo,
        cnpj_cpf,
        rg,
        data_nascimento,
        email,
        bairro,
        numero_logradouro,
        logradouro,
        inscricao_estadual,
        municipio_id,
        promocao_id,
        sn_ativo,
      });

      return res.status(201).json(novoCliente);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const cliente = await ClienteService.buscarClientePorId(id);
      if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const atualizacoes = req.body;

      const clienteAtualizado = await ClienteService.atualizarCliente(id, atualizacoes);
      return res.status(200).json(clienteAtualizado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      await ClienteService.deletarCliente(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ClienteController();
