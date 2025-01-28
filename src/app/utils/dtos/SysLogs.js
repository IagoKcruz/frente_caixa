class SysLogRegistroDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.tipoOperacao = data.tipoOperacao ? new TipoOperacaoDTO(data.tipoOperacao) : null; // Relacionado a TipoOperacaoDTO
      this.venda = data.venda ? new VendaDTO(data.venda) : null; // Relacionado a VendaDTO
      this.usuarioRegistro = data.usuarioRegistro ? new UsuarioDTO(data.usuarioRegistro) : null; // Relacionado a UsuarioDTO
      this.dataVenda = data.dataVenda || new Date().toISOString();
      this.query = data.query || null;
      this.snAtivo = data.snAtivo || null;
    }
  }