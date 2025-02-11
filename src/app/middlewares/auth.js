const { error } = require("console");
const jsonwebtoken = require("jsonwebtoken");

module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    const token= req.session.token;
    if (!token) {
      return res.redirect("/caixa/");
    }
    try {
      jsonwebtoken.verify(token, process.env.JWT_SECRET, (erro, decoded) => { 
        console.log(decoded, allowedRoles)
        if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
          return res.json({ error: "Permissão negada!" });
        }

        if(erro){
          return res.redirect("/caixa/")
        }else{
          return next(); 
        }
        
      });
    } catch (err) {
      return res.redirect("/caixa/")
    }
  };
};
