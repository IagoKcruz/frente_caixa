class ItemVendaDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.quantidade = data.quantidade || null;
      this.preco = data.preco || null;
      this.total = data.total || null;
      this.desconto = data.desconto || null;
      this.acrescimo = data.acrescimo || null;
      this.dataVenda = data.dataVenda || new Date().toISOString();
      this.snAtivo = data.snAtivo || null;
  
      // Relacionamento com outros DTOs
      this.item = data.item ? new ItemDTO(data.item) : null; // Relacionado ao ItemDTO
      this.venda = data.venda ? new VendaDTO(data.venda) : null; // Relacionado ao VendaDTO
      this.usuario = data.usuario ? new UsuarioDTO(data.usuario) : null; // Relacionado ao UsuarioDTO
    }
  }