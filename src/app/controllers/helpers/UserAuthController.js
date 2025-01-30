const AuthService = require("../../services/AuthService");

class AuthController {
  async login(req, res) {
    try {
      
      const { email, password } = req.body;
      // const token = await AuthService.login(email, password);
      console.log("cheguei aqui")
      res.render('layout', { body: '<h1>Bem-vindo!</h1>' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();