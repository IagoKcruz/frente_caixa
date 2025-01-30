const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const UserAuth = require("../models/UserAuth"); // Modelo do usuário

class AuthService {
  async login(email, password) {
    const user = await UserAuth.findOne({ where: { email } });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Senha incorreta");
    }

    const payload = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.encode(payload, process.env.JWT_SECRET);

    return token;
  }
}

module.exports = new AuthService();
