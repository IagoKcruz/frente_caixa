const { error } = require("console");
const jsonwebtoken = require("jsonwebtoken");

module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    const token= req.session.token;
    console.log(req.session.token)
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }
    try {
      // Verifica o token jsonwebtoken
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET, (erro, decoded) => { 
        
        if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
          return res.status(403).json({ error: "Permissão negada!" });
        }

        if(erro){
          // return res.json({
          //   error : erro.message
          // })
        }else{
          return next(); 
        }
        
      });
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  };
};
