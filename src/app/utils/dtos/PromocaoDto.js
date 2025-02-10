export class PromocaoDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.descricao = data.descricao || null;
      this.valor_final = data.valor_final || null;
      this.sn_promocao_geral = data.sn_promocao_geral || null;
      this.sn_percentagem = data.sn_percentagem || null;
      this.sn_ativo = data.sn_ativo || null;
      this.listaComboPromocao = data.combos_promocao || null
    }
  }
