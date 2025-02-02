// public/js/menu.js

document.addEventListener('DOMContentLoaded', () => {

    const menuItems = document.querySelectorAll('.menu-item');
    const submenuItems = document.querySelectorAll('.submenu-item');
    const menu = document.getElementById('menu');
    
    // Função para marcar o ícone da página ativa
    function setActiveMenuItem() {
      menuItems.forEach(item => {
        const currentPath = window.location.pathname;
        const link = item.querySelector('a');
        
        // Se o item corresponder à página atual, marca como ativo
        if (link && link.getAttribute('href') === currentPath) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  
    // Evento hover para o menu
    menu.addEventListener('mouseenter', () => {
      menu.classList.add('hover');
    });
  
    menu.addEventListener('mouseleave', () => {
      menu.classList.remove('hover');
    });
  
    // Alterna a visibilidade dos itens do submenu
    menuItems.forEach(item => {
      const submenu = item.querySelector('.submenu');
      if (submenu) {
        item.addEventListener('click', () => {
          submenu.classList.toggle('hidden');
        });
      }
    });
  
    // Chama a função para destacar o item da página ativa ao carregar a página
    setActiveMenuItem();
  });
  