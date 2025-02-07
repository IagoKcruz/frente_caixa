export class CategoriaDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.descricao = data.descricao || null;
    }
  }