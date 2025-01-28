class ItemDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.codigo = data.codigo || null;
      this.codigoDeBarra = data.codigoDeBarra || null;
      this.categoria = data.categoria ? new CategoriaDTO(data.categoria) : null;
      this.unidadeMedida = data.unidadeMedida ? new UnidadeMedidaDTO(data.unidadeMedida) : null;
      this.saldoEstoqueAtual = data.saldoEstoqueAtual || 0;
      this.registrarComissao = data.registrarComissao || null;
      this.snAtivo = data.snAtivo || null;
      this.descricao = data.descricao || null;
      this.preco = data.preco || null;
    }
  }