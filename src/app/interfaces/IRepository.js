class IRepository {
    findAll() {
      throw new Error('Método não implementado');
    }
  
    findById(id) {
      throw new Error('Método não implementado');
    }
  
    create(entity) {
      throw new Error('Método não implementado');
    }
  
    update(id, entity) {
      throw new Error('Método não implementado');
    }
  
    delete(id) {
      throw new Error('Método não implementado');
    }
  }
  
  module.exports = IRepository;