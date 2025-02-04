const MunicipioService = require('../../services/MunicipioService.js')
const { MunicipioDTO } = require("../../utils/dtos/MunicipioDto");

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
            console.log(req.body)
            const nome = req.body.nome;
            const municipios = await MunicipioService.GetListaMunicipios(nome ? nome : "");
            const municipiosDTO = municipios.map(m => new MunicipioDTO(m));

            return res.json({ Municipios : municipiosDTO });
        } catch (error) {
            return res.json({error : error});
        }
    }

    async createMunicipio (req, res) {
        try {
            const { descricao } = req.body;
            const municipio = await Municipio.create({ descricao });
            res.json(new MunicipioDTO(municipio));
        } catch (error) {
            console.error('Erro ao criar município:', error);
            res.status(500).send('Erro ao criar município');
        }
    }

    async updateMunicipio (req, res){
        try {
            const { id, descricao } = req.body;
            await Municipio.update({ descricao }, { where: { id } });
            res.json({ id, descricao });
        } catch (error) {
            console.error('Erro ao atualizar município:', error);
            res.status(500).send('Erro ao atualizar município');
        }
    }
}

module.exports = new CadastrarMunicipioController();