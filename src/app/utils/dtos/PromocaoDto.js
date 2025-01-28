class PromocaoDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.descricao = data.descricao || null;
      this.promocaoId = data.promocaoId ? new PromocaoDTO(data.unidadeMedida) : null;
    }
  }
  