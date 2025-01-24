const IRepository = require('../interfaces/IRepository');
const User = require('../models/user/User.js');

class UserRepository extends IRepository {
  async findAll() {
    return await User.findAll();
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async create(entity) {
    return await User.create(entity);
  }

  async update(id, entity) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuário não encontrado');
    return await user.update(entity);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuário não encontrado');
    return await user.destroy();
  }
}

module.exports = UserRepository;