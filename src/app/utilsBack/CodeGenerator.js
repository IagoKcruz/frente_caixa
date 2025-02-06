const crypto = require('crypto');
const usados = new Set(); // Conjunto para armazenar códigos usados

function gerarCodigoUnico(prefixo, tamanho = 6) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let codigoUnico;
    do {
        // Gerar código aleatório
        const aleatorio = crypto.randomBytes(tamanho)
            .map(byte => caracteres[byte % caracteres.length])
            .join('');
        
        codigoUnico = prefixo + aleatorio;
    } while (usados.has(codigoUnico)); // Se o código já foi gerado, tenta novamente

    // Armazena o código gerado para garantir unicidade
    usados.add(codigoUnico);
    return codigoUnico;
}

module.exports = gerarCodigoUnico;
