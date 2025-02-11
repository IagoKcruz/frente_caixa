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
        const precoFormatado = parseFloat(campo) || parseInt(campo);
        // Verificando se a conversão foi bem-sucedida e se o preço é maior que 0,01
        if (isNaN(precoFormatado) || precoFormatado <= 0.01) {
            this.adicionarErro(mensagem);
        }
    }

    validarCpfOuCnpj = (campo) => {
        // Expressão regular para CPF e CNPJ
        const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        const regexCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    
        // Verifica se o campo é um CPF válido
        if (regexCPF.test(campo)) {
            return { tipo: 'cpf', valido: true };
        }
    
        // Verifica se o campo é um CNPJ válido
        if (regexCNPJ.test(campo)) {
            return { tipo: 'cnpj', valido: true };
        }
    
        // Caso o campo não seja nem CPF nem CNPJ
        return { tipo: null, valido: false };
    };

    ValidarCPF(cpf) {
        // Validação básica de CPF
        const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!regexCPF.test(cpf)) {
            this.adicionarErro('CPF inválido');
        }
    }

    ValidarCNPJ(cnpj) {
        // Validação básica de CNPJ
        const regexCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        if (!regexCNPJ.test(cnpj)) {
            this.adicionarErro('CNPJ inválido');
        }
    }
}

module.exports = Validacao;

