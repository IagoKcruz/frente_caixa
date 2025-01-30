const AuthService = require("../services/AuthService");

class AuthController {
  async login(req, res) {
    try {
      // const { email, password } = req.body;
      // const token = await AuthService.login(email, password);
      console.log("cheguei aqui")
      return res.render('/User/index', { title: 'Página do Usuário' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();