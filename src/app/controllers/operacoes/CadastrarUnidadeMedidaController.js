const UnidadeMedidaService = require('../../services/UnidadeMedidaService.js')
const { v4: uuidv4 } = require('uuid');

class CadastrarUnidadeMedidaController {
    async openPageUnidadeMedida(req, res){
        try {
            return res.render('layout', { body: './partials/Operacoes/UnidadeMedidaPage.ejs'});
        } catch (error) {
            return res.json({error : error});
        }
    }

    async listarUnidadeMedidas(req, res){
        try {
            const nome = req.body.nome;
            let lista;
            if (!nome) {
                lista = await UnidadeMedidaService.getAllUnidadesMedida();
            } else {
                lista = await UnidadeMedidaService.getAllUnidadesMedidaFiltrada(nome);
            }

            return res.json({ UnidadeMedidas : lista });
        } catch (error) {
            return res.json({error : error});
        }
    }

    async createUnidadeMedida(req, res) {
        try {
            let unidadeMedidaDto = req.body;
            unidadeMedidaDto.id = uuidv4();
            const UnidadeMedida = await UnidadeMedidaService.createUnidadeMedida(unidadeMedidaDto);

            return res.json({ UnidadeMedida : UnidadeMedida , error : null});
        } catch (error) {
            console.error('Erro ao criar Unidade de Medida:', error);
            return res.json({error :'Erro ao criar Unidade de Medida'});
        }
    }

    async updateUnidadeMedida (req, res){
        try {
            const UnidadeMedidaDto = req.body;
            await UnidadeMedidaService.updateUnidadeMedida(UnidadeMedidaDto);

            return res.json({ UnidadeMedidaDto });
        } catch (error) {
            console.error('Erro ao atualizar Unidade de Medida:', error);
            return res.json({error :'Erro ao criar Unidade de Medida'})
        }
    }

    async deleteUnidadeMedida(req, res){
        try {
            let id = req.body.id;
            await UnidadeMedidaService.deleteUnidadeMedida(id);

            return res.json({ status : true });
        } catch (erro) {
            return res.json({error :'Erro ao deletar Unidade de Medida'})
        }
    }
}

module.exports = new CadastrarUnidadeMedidaController();