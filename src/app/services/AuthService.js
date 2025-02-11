const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");
const UsuarioRepository = require("../repositories/UsuarioRepository");
const { isValidRole, getRoleName } = require('../utilsBack/EnumRoles.js')

class AuthService {
  async login(email, codigo, sessionCode) {
    const user = await Usuario.findOne({ where: { email : email } });
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const validPassword = sessionCode = codigo;
    if (!validPassword) {
      throw new Error("Senha incorreta");
    }

    const payload = {
      id: user.email,
      role: getRoleName(user.grupo_usuario_id),
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:"24h", subject:payload.id });
    return token;
  }

  async findUserByEmail(email) {
    const user = await UsuarioRepository.countByEmail(email);
    
    if (!user || user == 0) {
       throw new Error("Email não encontrado");
    }
    return user;
  }
}

module.exports = new AuthService();
