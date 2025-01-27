const SysLogRegistroRepository = require('../repositories/SysLogRegistroRepository');

class SysLogRegistroService {
  constructor() {
    this.sysLogRegistroRepository = new SysLogRegistroRepository();
  }

  async getAllSysLogs() {
    return this.sysLogRegistroRepository.findAll({
      include: ['tipoOperacao', 'usuarioRegistro', 'venda'],
    });
  }

  async getSysLogById(id) {
    return this.sysLogRegistroRepository.findById(id);
  }

  async createSysLog(data) {
    return this.sysLogRegistroRepository.create(data);
  }

  async updateSysLog(id, data) {
    return this.sysLogRegistroRepository.update(id, data);
  }

  async deleteSysLog(id) {
    return this.sysLogRegistroRepository.delete(id);
  }
}

module.exports = SysLogRegistroService;
