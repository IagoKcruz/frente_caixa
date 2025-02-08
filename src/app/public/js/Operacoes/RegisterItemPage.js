import { openErrorWindow, openSuccessWindow } from '../WindowModal.js';
import { ajaxPost } from '../FetchCommom.js';

let categoriaId, unidadeMedidaId, saldoEstoqueAtual, registrarComissao, snAtivo, descricao, preco, salvarBtn;

function getDadosTela() {
    categoriaId = document.getElementById("categoria_id");
    unidadeMedidaId = document.getElementById("unidade_medida_id");
    saldoEstoqueAtual = document.getElementById("saldo_estoque_atual");
    registrarComissao = document.getElementById("registrar_comissao");
    snAtivo = document.getElementById("sn_ativo");
    descricao = document.getElementById("descricao");
    preco = document.getElementById("preco");
    salvarBtn = document.querySelector("#formItem button[type='submit']");
}

function limparCampos() {
    categoriaId.value = "";
    unidadeMedidaId.value = "";
    saldoEstoqueAtual.value = "";
    registrarComissao.value = "S";
    snAtivo.value = "S";
    descricao.value = "";
    preco.value = "";
}

async function registerItem(event) {
    event.preventDefault();
    try {
        let itemDTO = {
            categoria_id: categoriaId.value,
            unidade_medida_id: unidadeMedidaId.value,
            saldo_estoque_atual: saldoEstoqueAtual.value,
            registrar_comissao: registrarComissao.value,
            sn_ativo: snAtivo.value,
            descricao: descricao.value,
            preco: preco.value
        };
        
        const resAjax = await ajaxPost("/caixa/itens/criar", JSON.stringify(itemDTO));
        const response = await resAjax.json();

        if (response.ok) {
            limparCampos();
            openSuccessWindow(null, "Item registrado com sucesso!");
        } else {
            openErrorWindow(null, response.error);
        }
    } catch (err) {
        openErrorWindow("Erro ao realizar envio", "Erro ao registrar item: " + err.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getDadosTela();
    salvarBtn.addEventListener("click", registerItem);
});