//import { PromocaoDTO } from '../dtos/PromocaoDto.js';
import { PromocaoDTO } from '../../../dtos/PromocaoDto.js';
import { initializeWindowWithGrid, openErrorWindow, openSuccessWindow } from '../../WindowModal.js';
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '../../FetchCommom.js'
import * as gridPromocao from '../../Operacoes/Promocao/GridPromocao.js'

async function carregarPromocao(nome = "") {
    try {
        const response = await ajaxPost("/caixa/listar-Promocao", JSON.stringify({ nome }));
        const promocao = await response.json();
        gridPromocao.montarGridPromocao(promocao.Promocoes);
    } catch (error) {
        openErrorWindow(null, error);
        gridPromocao.montarGridPromocao([]);
    }
}

// Aplica a função sempre que o campo `sn_promocao_geral` for alterado
$(document).on("change", "#insertSnPromocaoGeral_novo, #editSnPromocaoGeral", function () {
    gridPromocao.validarCamposComBaseEmPromocaoGeralInsert();
    gridPromocao.validarCamposComBaseEmPromocaoGeralEdit();
});


document.getElementById("btnFiltrar").addEventListener("click", function () {
    const nome = document.getElementById("filterNome").value;
    carregarPromocao(nome);
});

carregarPromocao()