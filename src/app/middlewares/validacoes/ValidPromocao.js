const validacao = require('../../utilsBack/validations'); // Importando a classe de validação

module.exports = (req, res, next) => {
    const dados = req.body;
    const validacaoInstancia = new validacao();

    validacaoInstancia.NotNULL('Descrição é obrigatória', dados.descricao);

    if (dados.sn_promocao_geral === null || dados.sn_promocao_geral === undefined) {
        return res.json({ error: validacaoInstancia.erros });
    }

    if (dados.sn_promocao_geral === 'N') {
        if (dados.valor_final || dados.sn_percentagem) {
            validacaoInstancia.adicionarErro('Se a promoção geral for "Não", valor_final e sn_percentagem não podem ser preenchidos');
        }
    } 
    else if (dados.sn_promocao_geral === 'S') {
        validacaoInstancia.NotNULL('Valor final é obrigatório quando a promoção geral for "Sim"', dados.valor_final);
        validacaoInstancia.NotNULL('Percentagem é obrigatória quando a promoção geral for "Sim"', dados.sn_percentagem);

        if (dados.sn_percentagem === 'N') {
            validacaoInstancia.ValidarPreco('Valor final deve ser um valor válido', dados.valor_final);
        } else if (dados.sn_percentagem === 'S') {
            // Se sn_percentagem for "P", valor_final deve ser <= 100
            if (parseFloat(dados.valor_final) > 100) {
                validacaoInstancia.adicionarErro('Valor final não pode ser maior que 100% de desconto');
            }
        }
    }

    // Se houver erros de validação, retornamos a resposta com os erros
    if (!validacaoInstancia.valido) {
        return res.json({ error: validacaoInstancia.erros });
    }

    // Se tudo estiver ok, passamos para o próximo middleware
    next();
};
