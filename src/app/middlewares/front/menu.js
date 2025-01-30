// middleware/menu.js
const menuItems = [
    { name: 'Página 1', route: '/pagina1', iconClass: 'fas fa-home', isActive: false, submenu: [] },
    { name: 'Página 2', route: '/pagina2', iconClass: 'fas fa-user', isActive: false, submenu: [] },
    {
      name: 'Configurações', route: '#', iconClass: 'fas fa-cogs', isActive: false, submenu: [
        { name: 'Subpágina 1', route: '/subpagina1', iconClass: 'fas fa-cog' },
        { name: 'Subpágina 2', route: '/subpagina2', iconClass: 'fas fa-cog' }
      ]
    }
  ];
  
  function addMenu(req, res, next) {
    res.locals.menuItems = menuItems;
    //res.locals.imageSrc = '/path/to/your/image.png'; 
    next(); // Chama o próximo middleware ou rota
  }
  
  module.exports = addMenu;
  