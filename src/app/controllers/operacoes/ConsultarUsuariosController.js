const UsuarioService = require('../../services/UsuarioService');

class ConsultarUsuariosController {
    async openPage(req, res) {
        try {
            return res.render('layout', { body: './partials/Operacoes/ConsultarUsuariosPage.ejs'});
        } catch (error) {
            return res.json({error : error});
        }
    }


    async listarUsuarios(req, res){
        try {
            console.log(req.body)
            const nome = req.body.nome;
            let lista = await UsuarioService.getAllUsuarios(nome);
            return res.json({ usuarios : lista });
        } catch (error) {
            return res.json({error : error});
        }
    }

    async update(req, res) {
        const usuario = await await UsuarioService.updateUsuario(req.body);
        console.log(usuario);
        res.json(usuario);
    }
}

module.exports = new ConsultarUsuariosController();
