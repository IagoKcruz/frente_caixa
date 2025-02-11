const PromocaoService = require('../../services/PromocaoService.js');
const ComboPromocaoService = require('../../services/ComboPromocao.js');
const { v4: uuidv4 } = require('uuid');

class CadastrarPromocaoController {

    // Abrir página de cadastro de Promoção
    async openPagePromocao(req, res) {
        try {
            return res.render('layout', { body: './partials/Operacoes/PromocaoPage.ejs' });
        } catch (error) {
            return res.json({ error: error });
        }
    }

    // Listar Promoções
    async listarPromocoes(req, res) {
        try {
            const descricao = req.body.descricao;
            let lista;
            if (!descricao) {
                lista = await PromocaoService.listarPromocoes();
            } else {
                lista = await PromocaoService.listarPromocoesPorDescricao(descricao);
            }

            return res.json({ Promocoes: lista });
        } catch (error) {
            return res.json({ error: error });
        }
    }

    async verificarSePromoTemComboPromo(req, res) {
        try {
            const promoId = req.body.promoId;
            let verificar = await PromocaoService.verificarSePromoTemComboPromo(promoId);
            if(verificar == null){
                return res.json({verificar : true});
            }else{
                return res.json({verificar : false});
            }
            
        } catch (error) {
            return res.json({ error: error });
        }
    }

    // Criar Promoção
    async createPromocao(req, res) {
        try {
            const promocaoDto = req.body;
            promocaoDto.id = uuidv4();
            const promocao = await PromocaoService.criarPromocao(promocaoDto);

            return res.json({ promocao: promocao });
        } catch (error) {
            console.error('Erro ao criar promoção:', error);
            return res.json({ error: error });
        }
    }

    // Atualizar Promoção
    async updatePromocao(req, res) {
        try {
            const promocaoDto = req.body;
            await PromocaoService.updatePromocao(promocaoDto);

            return res.json({ promocaoDto });
        } catch (error) {
            console.error('Erro ao atualizar promoção:', error);
            return res.json({ error: error });
        }
    }

    // Criar Combo de Promoção
    async createComboPromocao(req, res) {
        try {
            const { valor_promocao, sn_percentagem, item_id, promocao_id } = req.body;
            
            // Criar o Combo de Promoção
            const comboPromocaoDto = {
                id: uuidv4(),
                valor_promocao,
                sn_percentagem,
                item_id,
                promocao_id
            };

            const validarComboExistente =  await ComboPromocaoService.verificaSeItemJaEstaNapromocao(comboPromocaoDto.promocao_id, comboPromocaoDto.item_id);      
            if(validarComboExistente){
                return res.json({error : "Produto já inserido nessa Promoção"})
            }

            const comboPromocao = await ComboPromocaoService.criarCombo(comboPromocaoDto);

            return res.json({ combo : comboPromocao });
        } catch (error) {
            console.error('Erro ao criar combo de promoção:', error);
            return res.json({ error: error });
        }
    }

    // Atualizar Combo de Promoção
    async updateComboPromocao(req, res) {
        try {
            const comboPromocaoDto = req.body;
            const response = await ComboPromocaoService.atualizarCombo(comboPromocaoDto);

            return res.json({ combo : comboPromocaoDto });
        } catch (erro) {
            return res.json({ error: erro.Error });
        }
    }

    // Deletar Combo de Promoção
    async deleteComboPromocao(req, res) {
        try {
            const { id } = req.body;
            const response = await ComboPromocaoService.deletarCombo(id);
            if(response){
                return res.json({ status: true });
            }else{
                return res.json({error : "Erro ao excluir Combo Promoção"})
            }

        } catch (error) {
            console.log(error.Error)
            return res.json({ error: error.Error });
        }
    }   
}

module.exports = new CadastrarPromocaoController();
