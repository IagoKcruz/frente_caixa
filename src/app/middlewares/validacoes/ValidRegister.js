const validacao = require('../../utilsBack/validations'); // Importando a classe de validação

module.exports = (req, res, next) => {
    const dados = req.body;
    const validacaoInstancia = new validacao();
    console.log(req.body)
    // Validação dos campos principais
    validacaoInstancia.NotNULL('Nome é obrigatório', dados.nome);
    validacaoInstancia.NotNULL('CNPJ ou CPF é obrigatório', dados.cnpj_cpf);
    validacaoInstancia.NotNULL('RG é obrigatório', dados.rg);
    validacaoInstancia.NotNULL('Data de Nascimento é obrigatória', dados.data_nascimento);
    validacaoInstancia.NotNULL('Email é obrigatório', dados.email);
    validacaoInstancia.NotNULL('Bairro é obrigatório', dados.bairro);
    validacaoInstancia.NotNULL('Número do logradouro é obrigatório', dados.numero_logradouro);
    validacaoInstancia.NotNULL('Logradouro é obrigatório', dados.logradouro);
    validacaoInstancia.NotNULL('Município é obrigatório', dados.municipio_id);
    validacaoInstancia.NotNULL('Status Ativo é obrigatório', dados.sn_ativo);

    // Validando o CPF ou CNPJ
    if (dados.cnpj_cpf) {
        const { tipo, valido } = validacaoInstancia.validarCpfOuCnpj(dados.cnpj_cpf);

        if (!valido) {
            validacaoInstancia.adicionarErro('CNPJ ou CPF no formato inválido');
        } else {
            if (tipo === 'cpf') {
                validacaoInstancia.ValidarCPF(dados.cnpj_cpf);
            } else if (tipo === 'cnpj') {
                validacaoInstancia.ValidarCNPJ(dados.cnpj_cpf);

                // Se for CNPJ, a inscrição estadual é obrigatória
                validacaoInstancia.NotNULL('Inscrição estadual é obrigatória para CNPJ', dados.inscricao_estadual);
            }
        }
    }

    // Se houver erros de validação, retornamos a resposta com os erros
    
    if (!validacaoInstancia.valido) {
        return res.status(400).json({ error : validacaoInstancia.erros });
    }

    // Se tudo estiver ok, passamos para o próximo middleware
    next();
};

