const AuthService = require("../services/AuthService");

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();