class Validacao {
    constructor() {
        this.valido = true;
        this.erros = [];
    }

    adicionarErro(mensagem) {
        this.valido = false;
        this.erros.push({ erro: mensagem });
    }

    NotNULL(mensagem, campo) {
        if (campo === null || campo === undefined || campo === "") {
            this.adicionarErro(mensagem);
        }
    }

    MinMaxString(mensagem, campo, min, max) {
        if (typeof campo !== "string" || campo.length < min || campo.length > max) {
            this.adicionarErro(mensagem.replace("{0}", min).replace("{1}", max));
        }
    }

    ValidarCamposObjeto(obj, regras) {
        obj.forEach((item, index) => {
            regras.forEach(({ nomeCampo, validacao, mensagem, ...params }) => {
                const valor = item[nomeCampo];

                if (typeof validacao === "function") {
                    validacao.call(this, mensagem, valor, ...Object.values(params));
                }
            });
        });
    }

    ValidarPreco(mensagem, campo) {
        // Garantir que o campo seja um número e não uma string
        const precoFormatado = parseFloat(campo);
    
        // Verificando se a conversão foi bem-sucedida e se o preço é maior que 0,01
        if (isNaN(precoFormatado) || precoFormatado <= 0.01) {
            this.adicionarErro(mensagem);
        }
    }
}

module.exports = Validacao;

