const jwt = require("jwt-simple");

module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const [, token] = authHeader.split(" ");

    try {
      // Verifica o token JWT
      const decoded = jwt.decode(token, process.env.JWT_SECRET);

      // Adiciona os dados do token à requisição
      req.userId = decoded.id;
      req.userRole = decoded.role;

      // Verifica se o papel do usuário está na lista de papéis permitidos
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: "Permissão negada!" });
      }

      return next(); // Passa para o próximo middleware ou controller
    } catch (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
  };
};
