const MunicipioService = require('../../services/MunicipioService.js')
const { v4: uuidv4 } = require('uuid');

class CadastrarMunicipioController {
    async openPageMunicipio(req, res){
        try {
            return res.render('layout', { body: './partials/Operacoes/MunicipioPage.ejs'});
        } catch (error) {
            return res.json({error : error});
        }
    }

    async listarMunicipios(req, res){
        try {
            const nome = req.body.nome;
            let lista;
            if (!nome) {
                lista = await MunicipioService.listarMunicipios();
            } else {
                lista = await MunicipioService.GetlistarMunicipios(nome);
            }

            return res.json({ Municipios : lista });
        } catch (error) {
            return res.json({error : error});
        }
    }

    async createMunicipio(req, res) {
        try {
            let municipioDto = req.body;
            municipioDto.id = uuidv4();
            const municipio = await MunicipioService.create(municipioDto);

            return res.json({ municipio : municipio , error : null});
        } catch (error) {
            console.error('Erro ao criar município:', error);
            return res.json({error :'Erro ao criar município'});
        }
    }

    async updateMunicipio (req, res){
        try {
            const municipioDto = req.body;
            await MunicipioService.update(municipioDto);

            return res.json({ municipioDto });
        } catch (error) {
            console.error('Erro ao atualizar município:', error);
            return res.json({error :'Erro ao criar município'})
        }
    }

    async deleteMunicipio(req, res){
        try {
            let id = req.body.id;
            console.log(id)
            await MunicipioService.delete(id);

            return res.json({ status : true });
        } catch (erro) {
            return res.json({error :'Erro ao deletar município'})
        }
    }
}

module.exports = new CadastrarMunicipioController();