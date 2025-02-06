const { v4: uuidv4 } = require('uuid');
const ClienteService = require('../../services/ClienteService');
const UsuarioService = require('../../services/UsuarioService');
const gerarCodigoUnico = require('../../utilsBack/CodeGenerator');

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
    console.log(req.body)
    try {
      const {
        nome,
        cnpj_cpf,
        rg,
        data_nascimento,
        email,
        bairro,
        numero_logradouro,
        logradouro,
        inscricao_estadual,
        municipio_id,
        sn_ativo
      } = req.body;

      const id = uuidv4();
      const codigo = gerarCodigoUnico(nome[0]);
      
      await ClienteService.criarCliente({
        id,
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
        sn_ativo,
      });

      await CriarUsuario(nome, email, sn_ativo); 
      
      return res.json({ ok: true });
    } catch (error) {
      return res.json({ erro: error.message });
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

async function CriarUsuario(nome, email, sn_ativo){
    return await UsuarioService.createUsuario({
      id : uuidv4(),
      nome,
      login : nome,
      email,
      sn_ativo
    })
}

module.exports = new ClienteController();
