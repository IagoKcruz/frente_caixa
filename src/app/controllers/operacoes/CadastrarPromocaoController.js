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

            return res.json({verificar});
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
            return res.json({ error: 'Erro ao atualizar promoção' });
        }
    }

    // Deletar Promoção
    async desativarPromocao(req, res) {
        try {
            const { id } = req.body;

            await PromocaoService.desativarPromocao(id);

            return res.json({ status: true });
        } catch (error) {
            console.error('Erro ao deletar promoção:', error);
            return res.json({ error: 'Erro ao deletar promoção' });
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
                valor_percentagem,
                item_id,
                promocao_id
            };

            const comboPromocao = await ComboPromocaoService.create(comboPromocaoDto);

            // Atualizar o valor_total da Promoção
            await this.atualizarValorFinalPromocao(promocao_id, comboPromocao.valor_promocao);

            return res.json({ comboPromocao, error: null });
        } catch (error) {
            console.error('Erro ao criar combo de promoção:', error);
            return res.json({ error: 'Erro ao criar combo de promoção' });
        }
    }

    // Atualizar Combo de Promoção
    async updateComboPromocao(req, res) {
        try {
            const comboPromocaoDto = req.body;

            await ComboPromocaoService.atualizarCombo(comboPromocaoDto);

            return res.json({ comboPromocaoDto });
        } catch (erro) {
            console.error('Erro ao atualizar combo de promoção:', erro);
            return res.json({ error: erro.error });
        }
    }

    // Deletar Combo de Promoção
    async deleteComboPromocao(req, res) {
        try {
            const { id } = req.body;

            await ComboPromocaoService.deletarCombo(id);

            return res.json({ status: true });
        } catch (error) {
            console.error('Erro ao deletar combo de promoção:', error);
            return res.json({ error: 'Erro ao deletar combo de promoção' });
        }
    }   
}

module.exports = new CadastrarPromocaoController();
