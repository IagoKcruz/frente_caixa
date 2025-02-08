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
        if (typeof campo !== "string") {
            this.adicionarErro(mensagem);
            return;
        }

        // Expressão regular para aceitar números inteiros ou com duas casas decimais no formato brasileiro
        const regexPreco = /^(\d{1,3}(\.\d{3})*|\d+)(,\d{2})?$/;

        if (!regexPreco.test(campo)) {
            this.adicionarErro(mensagem);
            return;
        }

        // Convertendo para número float e validando se é maior que 0.99
        const precoFormatado = parseFloat(campo.replace(/\./g, "").replace(",", "."));
        if (precoFormatado < 1) {
            this.adicionarErro(mensagem);
        }
    }
}

module.exports = Validacao;

