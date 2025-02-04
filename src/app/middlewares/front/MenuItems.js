const jsonwebtoken = require("jsonwebtoken");

const menuItems = {
  ADMIN: [
    { name: 'Dashboard', route: '/dashboard', iconClass: 'fas fa-chart-line' },
    { name: 'Usuários', route: '/usuarios', iconClass: 'fas fa-users' },
    { name: 'Configurações', route: '/config', iconClass: 'fas fa-cogs' },
    { name: 'Cadastrar Municipio', route: '/cadastrar-municipio', iconClass: 'fas fa-cogs' },
    {name: 'Sair', route: '/logout', iconClass: '/img/login'}
  ],
  CLIENTE: [
    { name: 'Início', route: '/home', iconClass: 'fas fa-home' },
    { name: 'Perfil', route: '/perfil', iconClass: 'fas fa-user' },
    {name: 'Sair', route: '/logout', iconClass: '/img/login.svg'}
  ],
  menu: [
    { name: 'Entrar', route: '/', iconClass: '/img/login.svg' },
    { name: 'Cadastrar', route: '/register', iconClass: '/img/register.svg' },
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
