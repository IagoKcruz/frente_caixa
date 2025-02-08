const Validacao = require("../../utilsBack/validations.js");

module.exports = (req, res, next) => {
    const validacao = new Validacao();
    const { categoria_id, unidade_medida_id, saldo_estoque_atual, registrar_comissao, sn_ativo, descricao, preco } = req.body;

    validacao.NotNULL("Categoria deve ser preenchida", categoria_id);
    validacao.NotNULL("Unidade Medida deve ser preenchida", unidade_medida_id);
    validacao.NotNULL("Saldo Estoque Atual deve ser preenchido", saldo_estoque_atual);
    validacao.NotNULL("Registrar Comissão deve ser preenchido", registrar_comissao);
    validacao.NotNULL("Ativo/Inativo deve ser preenchido", sn_ativo);
    validacao.MinMaxString("A descrição deve ter entre {0} e {1} caracteres.", descricao, 0, 100);
    validacao.ValidarPreco("O preço deve ser maior que 0.99 e estar no formato válido", preco);

    if (!validacao.valido) {
        return res.status(400).json({ erros: validacao.erros });
    }

    next();
};
