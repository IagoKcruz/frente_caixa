const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserAuth = require("../models/UserAuth"); // Modelo do usuário

class AuthService {
  async login(email, password) {
    // const user = await UserAuth.findOne({ where: { email } });

    // if (!user) {
    //   throw new Error("Usuário não encontrado");
    // }

    // const validPassword = await bcrypt.compare(1, 1);
    // if (!validPassword) {
    //   throw new Error("Senha incorreta");
    // }
    const payload = {
      id: email,
      role: "ADMIN",
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:"24h", subject:payload.id });
    
    return token;
  }
}

module.exports = new AuthService();
