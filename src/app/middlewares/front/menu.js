const jsonwebtoken = require("jsonwebtoken");

const menuItems = {
  ADMIN: [
    { name: 'Dashboard', route: '/dashboard', iconClass: 'fas fa-chart-line' },
    { name: 'Usuários', route: '/usuarios', iconClass: 'fas fa-users' },
    { name: 'Configurações', route: '/config', iconClass: 'fas fa-cogs' }
  ],
  CLIENTE: [
    { name: 'Início', route: '/home', iconClass: 'fas fa-home' },
    { name: 'Perfil', route: '/perfil', iconClass: 'fas fa-user' }
  ],
  menu: [
    { name: 'Entrar', route: '/home', iconClass: 'fas fa-home' },
    { name: 'Cadastrar', route: '/home', iconClass: 'fas fa-home' },
  ]
};

function addMenu(req, res, next) {
  const token= req.session.token;
  if(!token){
    res.locals.menuItems = menuItems["menu"];
  }else{
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (erro, decoded) => { 
        res.locals.menuItems = menuItems[decoded.role] || [];
    })
  }
  //res.locals.imageSrc = '/path/to/your/image.png';
  next();
}

module.exports = addMenu;
