class ComboPromocaoDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.valorPromocao = data.valorPromocao || null;
  
      // Lista de promoções associadas, inicializa com um array vazio ou com os dados passados
      this.promocoes = (data.promocoes || []).map(
        (promocao) => new PromocaoDTO(promocao) // Cria instâncias de PromocaoDTO
      );
    }
  }