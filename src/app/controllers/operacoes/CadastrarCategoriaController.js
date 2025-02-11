const CategoriaService = require('../../services/CategoriaService.js')
const { v4: uuidv4 } = require('uuid');

class CadastrarCategoriaController {
    async openPageCategoria(req, res){
        try {
            return res.render('layout', { body: './partials/Operacoes/CategoriaPage.ejs', title : "CADASTRAR CATEGORIA"});
        } catch (error) {
            return res.json({error : error});
        }
    }

    async listarCategorias(req, res){
        try {
            const nome = req.body.nome;
            let lista;
            if (!nome) {
                lista = await CategoriaService.getAllCategorias();
            } else {
                lista = await CategoriaService.getCategoriaFiltrada(nome);
            }

            return res.json({ Categorias : lista });
        } catch (error) {
            return res.json({error : error});
        }
    }

    async createCategoria(req, res) {
        try {
            let categoriaDto = req.body;
            categoriaDto.id = uuidv4();
            const categoria = await CategoriaService.createCategoria(categoriaDto);

            return res.json({ Categoria : categoria , error : null});
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
            return res.json({error :'Erro ao criar categoria'});
        }
    }

    async updateCategoria(req, res){
        try {
            const CategoriaDto = req.body;
            await CategoriaService.updateCategoria(CategoriaDto);

            return res.json({ CategoriaDto });
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            return res.json({error :'Erro ao criar categoria'})
        }
    }

    async deleteCategoria(req, res){
        try {
            let id = req.body.id;
            console.log(id)
            await CategoriaService.deleteCategorialete(id);

            return res.json({ status : true });
        } catch (erro) {
            return res.json({error :'Erro ao deletar categoria'})
        }
    }
}

module.exports = new CadastrarCategoriaController();