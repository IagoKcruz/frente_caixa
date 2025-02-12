const jsonwebtoken = require("jsonwebtoken");
const enumRole = require('../../utilsBack/EnumRoles');

const menuItems = {
  ADMIN: [
    { name: 'Municipio', route: '/cadastrar-Municipio', iconClass: 'fas fa-cogs' },
    { name: 'Unidade de Medida', route: '/cadastrar-UnidadeMedida', iconClass: 'fas fa-cogs' },
    { name: 'Promoção', route: '/cadastrar-Promocao', iconClass: 'fas fa-cogs' },
    { name: 'Categoria', route: '/cadastrar-Categoria', iconClass: 'fas fa-cogs' },
    { name: 'Catálogo', route: '/catalogo', iconClass: 'fas fa-cogs' },
    { name: 'Usuário', route: '/usuarios/page', iconClass: 'fas fa-cogs' },
    { name: 'Cadastrar Produto', route: '/registrar-Item', iconClass: 'fas fa-cogs' },
    { name: 'Forma Pagamento', route: '/FormaPagamento/openPage', iconClass: 'fas fa-cogs' },
    { name: 'Sair', route: '/logout', iconClass: '/img/login' }
  ],
  CLIENTE: [
    { name: 'Catálogo', route: '/catalogo', iconClass: 'fas fa-cogs' },
    { name: 'Sair', route: '/logout', iconClass: '/img/login.svg' }
  ],
  menu: [
    { name: 'Entrar', route: '/', iconClass: '/img/login.svg' },
    { name: 'Cadastrar', route: '/register', iconClass: '/img/register.svg' },
  ]
};

function addMenu(req, res, next) {
  const token = req.session.token;
  if (!token) {
    res.locals.menuItems = menuItems["menu"];
  } else {
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (erro, decoded) => {
      let role;
      if (decoded.role == enumRole.ADMIN) {
        role = "ADMIN"
      }else {
        role = "CLIENTE"
      }

      res.locals.menuItems = menuItems[role] || [];
    })
  }
  //res.locals.imageSrc = '/path/to/your/image.png';
  next();
}

module.exports = addMenu;
