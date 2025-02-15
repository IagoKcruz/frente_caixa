export class ClienteDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.nome = data.nome || null;
      this.codigo = data.codigo || null;
      this.cnpj_cpf = data.cnpj_cpf || null;
      this.rg = data.rg || null;
      this.data_nascimento = data.data_nascimento || null;
      this.email = data.email || null;
      this.bairro = data.bairro || null;
      this.numero_logradouro = data.numero_logradouro || null;
      this.logradouro = data.logradouro || null;
      this.inscricao_estadual = data.inscricao_estadual || null;
      this.municipio_id = data.municipio_id || null;
      this.promocao_id = data.promocao_id || null;
      this.sn_ativo = data.sn_ativo || null;
    }
}
  