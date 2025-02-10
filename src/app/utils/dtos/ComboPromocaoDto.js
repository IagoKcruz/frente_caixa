export class ComboPromocaoDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.valor_promocao = data.valor_promocao || null;
      this.sn_percentagem = data.sn_percentagem || null;
      this.promocao_id = data.promocao_id || null;
      this.item_id = data.item_id || null;
    }
  }