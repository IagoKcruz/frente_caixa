export class UsuarioDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.nome = data.nome || null;
      this.login = data.login || null;
      this.grupo_usuario_id = data.grupo_usuario_id || null;
      this.sn_ativo = data.sn_ativo || null;
    }
  } 