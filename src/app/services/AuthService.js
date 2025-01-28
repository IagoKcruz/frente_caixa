const jwt = require("jsonwebtoken");
const User = require("../models/UserAuth");
const AuthDTO = require("../utils/dtos/UserAuth.js");

class AuthService {
  async login(authDTO) {
    const user = await User.findOne({ where: { email: authDTO.email } });

    if (!user || !(await user.checkPassword(authDTO.password))) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return { user, token };
  }
}

module.exports = new AuthService();