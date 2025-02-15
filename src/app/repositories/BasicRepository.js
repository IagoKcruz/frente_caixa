
class BasicRepository {
    constructor(model) {
      if (!model) {
        throw new Error('Model is required for BaseRepository');
      }
      this.model = model;
    }
  
    async findAll() {
      return await this.model.findAll();
    }
  
    async findById(id) {
      return await this.model.findByPk(id);
    }
  
    async create(data) {
      return await this.model.create(data);
    }
  
    async update(updates) {
      const instance = await this.model.findByPk(updates.id);
      if (!instance) return null;
      return await instance.update(updates);
    }
  
    async delete(deleteModel) {
      await deleteModel.destroy();
      return instance;
    }
  }
  
  module.exports = BasicRepository;