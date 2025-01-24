const UserRepository = require('../repositories/UserRepository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async createUser(data) {
    return await this.userRepository.create(data);
  }
}

module.exports = UserService;