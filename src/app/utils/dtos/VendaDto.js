class VendaDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.totalVenda = data.totalVenda || null;
      this.desconto = data.desconto || null;
      this.acrescimo = data.acrescimo || null;
      this.observacao = data.observacao || null;
      this.dataCriacao = data.dataCriacao || new Date().toISOString();
      this.snAtivo = data.snAtivo || null;
      this.cliente = data.cliente ? new ClienteDTO(data.cliente) : null;
      this.itensVenda = (data.itensVenda || []).map(
        (itemVenda) => new ItemVendaDTO(itemVenda)
      ); // Lista de itens de venda
    }
  }