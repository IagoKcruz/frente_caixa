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
            return res.json(municipio);
        } catch (error) {
            console.error('Erro ao criar município:', error);
            return res.json({error :'Erro ao criar município'});

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