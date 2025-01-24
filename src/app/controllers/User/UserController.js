const UserService = require('../services/UserService');

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
}

module.exports = UserController;