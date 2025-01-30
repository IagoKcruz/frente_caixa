const VendaService = require('../../services/VendaService');

class VendaController {
  async listar(req, res) {
    try {
      const vendas = await VendaService.listarVendas();
      return res.status(200).json(vendas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const venda = await VendaService.buscarVendaPorId(id);
      if (!venda) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }
      return res.status(200).json(venda);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async buscarPorCliente(req, res) {
    try {
      const { clienteId } = req.params;
      const vendas = await VendaService.buscarVendasPorCliente(clienteId);
      if (!vendas.length) {
        return res.status(404).json({ error: 'Nenhuma venda encontrada para este cliente' });
      }
      return res.status(200).json(vendas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async criar(req, res) {
    try {
      const data = req.body;
      const venda = await VendaService.criarVenda(data);
      return res.status(201).json(venda);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const venda = await VendaService.atualizarVenda(id, updates);
      if (!venda) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }
      return res.status(200).json(venda);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const venda = await VendaService.deletarVenda(id);
      if (!venda) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }
      return res.status(200).json(venda);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new VendaController();