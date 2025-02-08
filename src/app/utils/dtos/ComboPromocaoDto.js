export class ComboPromocaoDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.valor_promocao = data.valor_promocao || null;
      this.valor_percentagem = data.valor_percentagem || null;
      this.valor_final_promocao = data.valor_final_promocao || null;
      this.promocao_id = data.promocao_id || null;
      this.item_id = data.item_id || null;
    }
  }