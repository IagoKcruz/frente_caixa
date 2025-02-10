const validacao = require('../../utilsBack/validations'); // Importando a classe de validação

module.exports = (req, res, next) => {
    const dados = req.body;
    const validacaoInstancia = new validacao();

    console.log(req.body);

    // Validação para o campo valor_promocao
    validacaoInstancia.NotNULL('Valor da promoção é obrigatório', dados.valor_promocao);

    // Validação para o campo sn_percentagem
    validacaoInstancia.NotNULL('Percentagem é obrigatória', dados.sn_percentagem);

    // Validação para o campo item_id
    validacaoInstancia.NotNULL('ID do item é obrigatório', dados.item_id);

    // Validação para o campo promocao_id
    validacaoInstancia.NotNULL('ID da promoção é obrigatório', dados.promocao_id);

    // Se sn_percentagem for "S", validamos o valor_promocao
    if (dados.sn_percentagem) {
        if (dados.sn_percentagem === 'N') {
            validacaoInstancia.ValidarPreco('Valor final deve ser um valor válido', dados.valor_final);
        }
        if (dados.valor_promocao === "S" && parseFloat(dados.valor_promocao) > 100) {
            validacaoInstancia.adicionarErro('Valor da promoção não pode ser maior que 100%');
        }
    }

    // Se houver erros de validação, retornamos a resposta com os erros
    if (!validacaoInstancia.valido) {
        return res.json({ error: validacaoInstancia.erros });
    }

    // Se tudo estiver ok, passamos para o próximo middleware
    next();
};
