export class ClienteDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.nome = data.nome || null;
      this.codigo = data.codigo || null;
      this.cnpjCpf = data.cnpjCpf || null;
      this.rg = data.rg || null;
      this.dataNascimento = data.dataNascimento || null;
      this.email = data.email || null;
      this.bairro = data.bairro || null;
      this.numeroLogradouro = data.numeroLogradouro || null;
      this.logradouro = data.logradouro || null;
      this.inscricaoEstadual = data.inscricaoEstadual || null;
      this.municipioId = data.municipioId || null;
      this.promocaoId = data.promocaoId || null;
      this.snAtivo = data.snAtivo || null;
    }
  }
  