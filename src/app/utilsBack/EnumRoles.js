const enumRole = Object.freeze({
  ADMIN: 1,
  CLIENTE: 2,

  // Usando Symbol para comportar-se como enum mas também com os métodos que você pediu
  getIntValue(role) {
    return role;
  },

  getStringValue(role) {
    return role === this.ADMIN ? 'ADMIN' : role === this.CLIENTE ? 'CLIENTE' : null;
  }
});

// Exportando o enumRole para uso em outros módulos
module.exports = enumRole;
