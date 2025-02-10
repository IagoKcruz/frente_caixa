import { PromocaoDTO } from '../../../dtos/PromocaoDto.js';
import { initializeWindowWithGrid, openErrorWindow, openSuccessWindow } from '../../WindowModal.js';
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '../../FetchCommom.js'
import * as gridComboPromocao from '../../Operacoes/Promocao/GridComboPromocao.js'
// Função Genérica para Montar `insertTemplate` e `editTemplate`
function gerarTemplateSelect(value, nomeId, options) {
    const select = $("<select>").attr("id", nomeId);
    options.forEach(option => {
        select.append($("<option>").attr("value", option.value).text(option.text));
    });

    $("#"+nomeId).on("change", ()=>{
        console.log("oi")
    })

    if (value) select.val(value);
    return select;
}

const options = [
    { value: "S", text: "Sim" },
    { value: "N", text: "Não" }
];

// Função para o `insertTemplate` e `editTemplate` de sn_ativo
function gerarTemplateSnAtivo(value, nomeId) {
    return gerarTemplateSelect(value, nomeId, options);
}

// Função para o `insertTemplate` e `editTemplate` de sn_promocao_geral
function gerarTemplateSnPromocaoGeral(value, nomeId) {

    return gerarTemplateSelect(value, nomeId, options);
}

// Função para o `insertTemplate` e `editTemplate` de sn_percentagem
function gerarTemplateSnPercentagem(value, nomeId) {
    const options = [
        { value: "P", text: "%" },
        { value: "V", text: "Valor" },
        { value: "C", text: "Combo Promoção" }
    ];
    return gerarTemplateSelect(value, nomeId, options);
}

// Função para "Abrir SubGrid"
function gerarAbrirSubGridButton(snPromocaoGeral, itemId) {
    const button = $("<button>").text("Abrir Combo").attr("disabled", snPromocaoGeral !== "N");
    button.on("click", async function (event) {
        event.stopPropagation();
        if (snPromocaoGeral === "N") {
            await abrirPopupCombos(itemId);
        }
    });
    return button;
}

// Função para montar a grid
export function montarGridPromocao(dataGrid) {
    $("#jsGridPromocao").jsGrid({
        width: "100%",
        height: "400px",

        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        autoload: true,
        deleting: true,

        data: Array.isArray(dataGrid) ? dataGrid : [],

        fields: [
            { name: "id", type: "number", title: "ID", width: 50, readOnly: true, visible: false },
            { name: "descricao", type: "text", title: "Descrição", width: 150 },
            { 
                name: "valor_final", 
                type: "number", 
                title: "Valor Final", 
                width: 100, 
                readOnly: true, 
                
                insertTemplate: function () {
                    return $("<input>").attr("id", "insertValorFinal_novo").attr("type", "number");
                },
                editTemplate: function (value, item) {
                    return $("<input>").attr("id", "editValorFinal").attr("type", "number").val(value);
                },
                insertValue: function () {
                    return $("#insertValorFinal_novo").val();
                },
                editValue: function () {
                    return $("#editValorFinal_" + this.item.id).val();
                }
            },
            { 
                name: "sn_promocao_geral", 
                type: "select", 
                title: "Promoção Geral", 
                items: [{ Name: "Sim", Id: "S" }, { Name: "Não", Id: "N" }], 
                valueField: "Id", 
                textField: "Name", 
                width: 80, 
                
                insertTemplate: function () {
                    return gerarTemplateSnPromocaoGeral("", "insertSnPromocaoGeral_novo");
                },
                editTemplate: function (value, item) {
                    return gerarTemplateSnPromocaoGeral(value, "editSnPromocaoGeral");
                },
                insertValue: function () {
                    return $("#insertSnPromocaoGeral_novo").val();
                },
                editValue: function () {
                    return $("#editSnPromocaoGeral_" + this.item.id).val();
                }
            },
            { 
                name: "sn_percentagem", 
                type: "select", 
                title: "Valor em %", 
                items: [{ Name: "%", Id: "P" }, { Name: "Valor", Id: "V" }, { Name: "Combo Promoção", Id: "C" }], 
                valueField: "Id", 
                textField: "Name", 
                width: 80, 
                
                insertTemplate: function () {
                    return gerarTemplateSnPercentagem("", "insertSnPercentagem_novo");
                },
                editTemplate: function (value, item) {
                    return gerarTemplateSnPercentagem(value, "editSnPercentagem");
                },
                insertValue: function () {
                    return $("#insertSnPercentagem_novo").val();
                },
                editValue: function () {
                    return $("#editSnPercentagem_" + this.item.id).val();
                }
            },
            { 
                name: "sn_ativo", 
                type: "select", 
                title: "Ativo", 
                items: [{ Name: "Sim", Id: "S" }, { Name: "Não", Id: "N" }], 
                valueField: "Id", 
                textField: "Name", 
                width: 80, 
               
                insertTemplate: function () {
                    return gerarTemplateSnAtivo("", "insertSnAtivo_novo");
                },
                editTemplate: function (value, item) {
                    return gerarTemplateSnAtivo(value, "editSnAtivo");
                },
                insertValue: function () {
                    return $("#insertSnAtivo_novo").val();
                },
                editValue: function () {
                    return $("#editSnAtivo_" + this.item.id).val();
                }
            },
            { 
                name: "abrirComo", 
                title: "Abrir SubGrid", 
                width: 100,
                itemTemplate: function (value, item) {
                    if(item.sn_promocao_geral == "N"){
                        return $("<button>").text("Abrir Combo").on("click", async function (event) {
                            event.stopPropagation()
                            await gridComboPromocao.abrirPopupCombos(item.sn_promocao_geral, item.combos_promocao, item.id);
                        });
                    }
                    return "<span>";
                }
            },
            { type: "control", editButton: true, deleteButton: true },
        ],

        controller: {
            insertItem: async function(item) {
                return await createPromocao(item);
            },

            updateItem: async function(item) {
                return await updatePromocao(item);
            },

            deleteItem: async function(item) {
                return await deletePromocao(item);
            }
        },
    });
}

async function createPromocao(item) {
    try {
        const promocaoDTO = new PromocaoDTO(item);
        const response = await ajaxPost('/caixa/Promocao-criar', JSON.stringify(promocaoDTO));
        const newPromocao = await response.json();

        console.log(newPromocao)

        if (newPromocao.error) throw new Error(newPromocao.error);

        return {
            id: newPromocao.promocao.id,
            descricao: newPromocao.promocao.descricao,
            valor_final: newPromocao.promocao.valor_final,
            sn_percentagem: newPromocao.promocao.sn_percentagem,
            sn_promocao_geral: newPromocao.promocao.sn_promocao_geral,
            sn_ativo: newPromocao.promocao.sn_ativo,
            comboPromocoes: newPromocao.promocao.comboPromocoes // Exemplo de retorno com subgrid
        };
    } catch (error) {
        openErrorWindow(null, error.error || error.errors);
        return $.Deferred().reject(error).promise();
    }
}

async function updatePromocao(item) {
    try {
        const promocaoDTO = new PromocaoDTO(item);
        const response = await ajaxPut('/caixa/Promocao-update', JSON.stringify(promocaoDTO));
        const updatedPromocao = await response.json();

        if (updatedPromocao.error) throw new Error(updatedPromocao.error);

        return updatedPromocao.PromocaoDTO;
    } catch (error) {
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}

async function deletePromocao(item) {
    try {
        const bodyRequest = { id: item.id };
        const response = await ajaxDelete('/caixa/Promocao-delete', JSON.stringify(bodyRequest));
        const result = await response.json();

        if (result.erro) throw new Error(result);

        return result;
    } catch (error) {
        openErrorWindow(null, error.Error);
        return $.Deferred().reject(error).promise();
    }
}


export function validarCamposComBaseEmPromocaoGeralInsert() {
    // Verifica o valor selecionado de sn_promocao_geral
    const snPromocaoGeral = $("#insertSnPromocaoGeral_novo").val();

    if (snPromocaoGeral === "S") {
        // Habilita o campo valor_final
        $("#insertValorFinal_novo").prop("disabled", false);
        
        // Habilita sn_percentagem
        $("#insertSnPercentagem_novo").prop("disabled", false);
        
        // Valor em percentual será preenchido com "V" para inserção
        if (!$("#insertSnPercentagem_novo").val()) {
        }
    } else {
        // Desabilita o campo valor_final
        $("#insertValorFinal_novo").prop("disabled", true);
        
        // Desabilita sn_percentagem e limpa o valor
        $("#insertSnPercentagem_novo").prop("disabled", true).val("");
    }
}

export function validarCamposComBaseEmPromocaoGeralEdit() {
    // Verifica o valor selecionado de sn_promocao_geral
    const snPromocaoGeral = $("#editSnPromocaoGeral").val();

    if (snPromocaoGeral === "S") {
        // Habilita o campo valor_final
        $("#editValorFinal").prop("disabled", false);
        
        // Habilita sn_percentagem
        $("#editSnPercentagem").prop("disabled", false)
    } else {
        // Desabilita o campo valor_final
        $("#editValorFinal").prop("disabled", true);
        
        // Desabilita sn_percentagem e limpa o valor
        $("#editSnPercentagem").prop("disabled", true).val("");
    }
}

async function verificarSeTemCombo(promocaoId) {
    try {
        let response = await ajaxGet("/caixa/verificar-promcao-com-items", JSON.stringify({promoId : promocaoId}));
        let result = await response.json();
        return result.temComboAtivo; // Retorna true se houver combos ativos, senão false
    } catch (error) {
        console.error("Erro ao verificar combo ativo:", error);
        return false;
    }
}