class UsuarioDTO {
    constructor(data = {}) {
      this.id = data.id || null;
      this.nome = data.nome || null;
      this.login = data.login || null;
      this.grupoUsuarioId = data.grupoUsuarioId || null;
      this.snAtivo = data.snAtivo || null;
    }
  } 