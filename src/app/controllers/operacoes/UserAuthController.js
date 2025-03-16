const jsonwebtoken = require("jsonwebtoken")
const AuthService = require("../../services/AuthService");
const MunicipioService = require("../../services/MunicipioService");

class AuthController {
  async login(req, res) {
    try {
      const { email, codigo } = req.body;
      const sessionCode = req.session.codigo;
      const token = await AuthService.login(email, codigo, sessionCode);
      if(token){
        req.session.token = token;
        return res.json({token : token});
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async findUserByEmail(req, res) {
    try {
      const UserEmail = req.body.UserEmail;
      await AuthService.findUserByEmail(UserEmail);

      let randon = Math.floor(10000 + Math.random() * 90000);
      req.session.codigo = randon;
      
      return res.json({ code : randon });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }

  async index(req, res) {
      return res.render('layout', { body: './partials/LoginPage.ejs', title : "LOGIN" })
  }

  async openRegisterPage(req, res) {
    const municipios = await MunicipioService.listarMunicipios();

    return res.render('layout', { body: './partials/Operacoes/RegistroPage.ejs', role: "", Municipios : municipios, title : "CRIAR CONTA"})
  }
}

module.exports = new AuthController();