const UsuarioService = require('../../services/UsuarioService');

class ConsultarUsuariosController {
    async openPage(req, res) {
        try {
            return res.render('layout', { body: './partials/Operacoes/ConsultarUsuariosPage.ejs', title : "CONTROLE DE USUÁRIOS"});
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

    async updateUsuario(req, res) {
        try 
        {
            const usuario = await UsuarioService.updateUsuario(req.body);
            console.log(usuario);
            if(usuario){
                return res.json({ usuario: usuario });
            }else{
                return res.json({error : error})
            }
        }catch (erro){
            return res.json({error : erro})
        }
    }
}

module.exports = new ConsultarUsuariosController();
