class RecebimentoVendaDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.venda = data.venda ? new VendaDTO(data.venda) : null; // Relacionado a VendaDTO
      this.formaPagamento = data.formaPagamento ? new FormaPagamentoDTO(data.formaPagamento) : null; // Relacionado a FormaPagamentoDTO
    }
  }