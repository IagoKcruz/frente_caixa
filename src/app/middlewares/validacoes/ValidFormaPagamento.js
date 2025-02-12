const validacao = require('../../utilsBack/validations'); // Importando a classe de validação
module.exports = (req, res, next) => {
    const {
        descricao,
        tipo_recebimento_id,
        parcelas
    } = req.body;
    const validacaoInstancia = new validacao();

    validacaoInstancia.NotNULL("Descrição deve ser preenchido", descricao);

    validacaoInstancia.NotNULL('Tipo Recebimento é obrigatória', tipo_recebimento_id);

    const precisaDeParceals = ["1", "4", "8"]

    if (precisaDeParceals.includes(tipo_recebimento_id)) {
        validacaoInstancia.NotNULL('Quantidade Parcelas deve ser preenchido', parcelas);
    }

    // Se houver erros de validação, retornamos a resposta com os erros
    if (!validacaoInstancia.valido) {
        return res.json({ error: validacaoInstancia.erros });
    }

    // Se tudo estiver ok, passamos para o próximo middleware
    next();
};
