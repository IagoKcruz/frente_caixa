const UserService = require('../services/UserService.js');

class UserController {
  static async getAll(req, res) {
    try {
      const service = new UserService();
      const users = await service.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const service = new UserService();
      const user = await service.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async index(req, res) {
    try {
      // Renderiza a view localizada em `views/User/index.ejs`
      res.render('User/index', {
        title: 'Lista de Usuários',
        message: 'Bem-vindo à tela de usuários!',
      });
    } catch (err) {
      res.status(500).send('Erro ao carregar a página: ' + err.message);
    }
  }
}

module.exports = UserController;