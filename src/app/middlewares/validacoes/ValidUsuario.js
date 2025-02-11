const validacao = require('../../utilsBack/validations'); // Importando a classe de validação

module.exports = (req, res, next) => {
    const dados = req.body;
    const validacaoInstancia = new validacao();

    validacaoInstancia.MinMaxString("O login deve ter entre {0} e {1} caracteres.", dados.login, 3, 9);

    validacaoInstancia.NotNULL('Selecione um grupo válido (ADMIN ou CLIENTE).', dados.grupo_usuario_id);

    if (dados.grupo_usuario_id && dados.grupo_usuario_id !== 1 && dados.grupo_usuario_id !== 2) {
        validacaoInstancia.adicionarErro('Selecione um grupo válido (ADMIN ou CLIENTE).');
    }

    // Se houver erros de validação, retornamos a resposta com os erros
    if (!validacaoInstancia.valido) {
        return res.json({ error: validacaoInstancia.erros });
    }

    // Se tudo estiver ok, passamos para o próximo middleware
    next();
};
