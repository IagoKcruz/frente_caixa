const AuthService = require("../services/AuthService");

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const authDTO = new AuthDTO(email, password);
      const { user, token } = await AuthService.login(authDTO);
      
      return res.json({ user, token });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
