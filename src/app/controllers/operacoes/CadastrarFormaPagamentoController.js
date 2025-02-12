const FormaPagamentoService = require('../../services/FormaPagamentoService.js')
const { v4: uuidv4 } = require('uuid');
const TipoRecebimentoService = require('../../services/TipoRecebimentoService.js');
const gerarCodigoUnico = require('../../utilsBack/CodeGenerator');

class CadastrarFormaPagamentoController {
    async openPageFormaPagamento(req, res){
        try {
            return res.render('layout', { body: './partials/Operacoes/FormaPagamentoPage.ejs', title : "CADASTRAR FORMA PAGAMENTO"});
        } catch (error) {
            return res.json({error : error});
        }
    }

    async listarFormaPagamentos(req, res){
        try {
            let message = []

            const descricao = req.body.descricao;
            
            let lista = await FormaPagamentoService.getAllFormasPagamento(descricao);
            console.log(lista)

            if(lista == null || !lista){
                message.push("error","Erro ao buscar Formas de Pagamento")
            }
            let tipo = await TipoRecebimentoService.getAllTiposRecebimento();
            if(tipo == null || !tipo){
                message.push("error","Erro ao buscar Formas de Pagamento")
            }

            if(message.length > 0){
                return res.json({error : message})
            }

            return res.json({ formaPagamentos : lista, tipo_recebimento : tipo });
        } catch (error) {
            return res.json({error : error});
        }
    }

    async createFormaPagamento(req, res) {
        try {
            const {
                descricao,
                tipo_recebimento_id,
                parcelas
            } = req.body;

            const id = uuidv4()
            const codigo = gerarCodigoUnico("FP");

            const formaPagamento = await FormaPagamentoService.createFormaPagamento( 
                {id, 
                codigo,
                descricao,
                tipo_recebimento_id,
                parcelas}
            );

            return res.json({ formaPagamento : formaPagamento});
        } catch (erro) {
            let error = erro.Error
            return res.json({error :error});
        }
    }

    async updateFormaPagamento(req, res){
        try {
            const {
                codigo,
                descricao,
                tipo_recebimento_id,
                parcelas
            } = req.body;

            const formaPagamento = await FormaPagamentoService.updateFormaPagamento(  
                    {
                        descricao,
                        tipo_recebimento_id,
                        parcelas
                    }
                );

            return res.json({ formaPagamento: formaPagamento });
        } catch (erro) {
            let error = erro.Error
            return res.json({error :error});
        }
    }

    async deleteFormaPagamento(req, res){
        try {
            let id = req.body.id;
            console.log(id)
            await FormaPagamentoService.deleteFormaPagamento(id);

            return res.json({ status : true });
        } catch (erro) {
            let error = erro.Error
            return res.json({error :error});
        }
    }
}

module.exports = new CadastrarFormaPagamentoController();