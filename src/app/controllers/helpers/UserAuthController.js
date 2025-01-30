const AuthService = require("../../services/AuthService");

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async openHome(req, res) {
      return res.render('layout', { body: './partials/login.ejs' })
  }
}

module.exports = new AuthController();