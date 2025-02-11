export class FormaPagamentoDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.codigo = data.codigo || null;
      this.descricao = data.descricao || null;
      this.tipo_recebimento_id = data.tipo_recebimento_id ? data.tipo_recebimento_id : null;
      this.parcelas = data.parcelas ? data.parcelas : null;
    }
  }