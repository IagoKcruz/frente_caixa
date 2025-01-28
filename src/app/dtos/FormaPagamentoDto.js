class FormaPagamentoDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.codigo = data.codigo || null;
      this.descricao = data.descricao || null;
      this.tipoRecebimento = data.tipoRecebimento ? new TipoRecebimentoDTO(data.tipoRecebimento) : null;
    }
  }