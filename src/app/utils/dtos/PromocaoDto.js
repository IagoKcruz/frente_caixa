class PromocaoDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.descricao = data.descricao || null;
      this.valor_final = data.valor_final ? new PromocaoDTO(data.unidadeMedida) : null;
    }
  }
  