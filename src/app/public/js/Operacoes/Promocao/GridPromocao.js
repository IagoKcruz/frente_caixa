import { PromocaoDTO } from '../../../dtos/PromocaoDto.js';
import { initializeWindowWithGrid, openErrorWindow, openSuccessWindow } from '../../WindowModal.js';
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '../../FetchCommom.js'
import * as gridComboPromocao from '../../Operacoes/Promocao/GridComboPromocao.js'
// Função Genérica para Montar `insertTemplate` e `editTemplate`
function gerarTemplateSelect(value, nomeId, options, id) {
    const select = $("<select>").attr("id", nomeId).attr("class", (id ?? ""));
    options.forEach(option => {
        select.append($("<option>").attr("value", option.value).text(option.text));
    });

    $("#" + nomeId).on("change", () => {
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
function gerarTemplateSn(value, nomeId, id) {
    return gerarTemplateSelect(value, nomeId, options, id);
}

// Função para montar a grid
export function montarGridPromocao(dataGrid) {
    $("#jsGridPromocao").jsGrid({
        width: "100%",
        height: "400px",

        inserting: true,
        editing: true,
        deleting: false,
        sorting: true,
        paging: true,

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
                    return $("#editValorFinal").val();
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
                    return gerarTemplateSn("", "insertSnPromocaoGeral_novo");
                },
                editTemplate: function (value, item) {
                    return gerarTemplateSn(value, "editSnPromocaoGeral", item.id);
                },
                insertValue: function () {
                    return $("#insertSnPromocaoGeral_novo").val();
                },
                editValue: function () {
                    return $("#editSnPromocaoGeral").val();
                }
            },
            {
                name: "sn_percentagem",
                type: "select",
                title: "Valor em %",
                items: [{ Name: "Sim", Id: "S" }, { Name: "Não", Id: "N" }],
                valueField: "Id",
                textField: "Name",
                width: 80,

                insertTemplate: function (value, item) {
                    return gerarTemplateSn("", "insertSnPercentagem_novo");
                },
                editTemplate: function (value, item) {
                    return gerarTemplateSn(value, "editSnPercentagem");
                },
                insertValue: function () {
                    return $("#insertSnPercentagem_novo").val();
                },
                editValue: function () {
                    return $("#editSnPercentagem").val();
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
                    return gerarTemplateSn("", "insertSnAtivo_novo");
                },
                editTemplate: function (value, item) {
                    return gerarTemplateSn(value, "editSnAtivo");
                },
                insertValue: function () {
                    return $("#insertSnAtivo_novo").val();
                },
                editValue: function () {
                    return $("#editSnAtivo").val();
                }
            },
            {
                name: "abrirComo",
                title: "Abrir SubGrid",
                width: 100,
                itemTemplate: function (value, item) {
                    if (item.sn_promocao_geral == "N") {
                        return $("<button>").text("Abrir Combo").on("click", async function (event) {
                            event.stopPropagation()
                            await gridComboPromocao.abrirPopupCombos(item.sn_promocao_geral, item.combos_promocao, item.id);
                        });
                    }
                    return "<span>";
                }
            },
            { type: "control", editButton: true, deleteButton: false },
        ],

        controller: {
            insertItem: async function (item) {
                item.cancel = true;

                let result = await createPromocao(item);
    
                if (result === false) {
                    this.cancelEdit();
                    return false;  // Impede a inserção do item na grid
                }
    
                return result;
            },
    
            updateItem: async function (item) {
                const result =await updatePromocao(item);
                    
                if (result === false) {
                    this.cancelEdit();
                    return false;  // Impede a inserção do item na grid
                }
    
                return result;
            }
        },
    });
}

async function createPromocao(item) {
    try {
        const promocaoDTO = new PromocaoDTO(item);
        const response = await ajaxPost('/caixa/Promocao-criar', JSON.stringify(promocaoDTO));
        const newPromocao = await response.json();


        if (newPromocao.error) { 
            openErrorWindow(null, newPromocao.error); 
            return false;
        }

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

        if (updatedPromocao.error) { 
            openErrorWindow(null, updatedPromocao.error); 
            return false;
        }

        return updatedPromocao.PromocaoDTO;
    } catch (error) {
        $("#jsGridPromocao").jsGrid("cancelInsert");
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}


export function validarCamposComBaseEmPromocaoGeralInsert(e) {
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
        $("#insertValorFinal_novo").val("");

        // Desabilita sn_percentagem e limpa o valor
        $("#insertSnPercentagem_novo").prop("disabled", true).val("");
    }
}

export async function validarCamposComBaseEmPromocaoGeralEdit() {
    // Verifica o valor selecionado de sn_promocao_geral
    const snPromocaoGeral = $("#editSnPromocaoGeral").val();
    if (snPromocaoGeral === "S") {
        let promocaoId = $("#editSnPromocaoGeral").attr("class");

        const response = await verificarSeTemCombo(promocaoId);
        if(response){
            // Habilita o campo valor_final
            $("#editValorFinal").prop("disabled", false);
            
            // Habilita sn_percentagem
            $("#editSnPercentagem").prop("disabled", false)
        }else if(response == false){
            $("#editSnPercentagem").prop("disabled", false).val("")
            $("#editSnPromocaoGeral").val("N")
            openErrorWindow(null, "Não será possivél mudar para promoção geral, pois existem combos abertas");
        }
    } else {
        // Desabilita o campo valor_final
        $("#editValorFinal").prop("disabled", true);
        $("#editValorFinal").val("");

        // Desabilita sn_percentagem e limpa o valor
        $("#editSnPercentagem").prop("disabled", true).val("");
    }
}

async function verificarSeTemCombo(promocaoId) {
    try {
        let response = await ajaxPost("/caixa/verificar-promcao-com-items", JSON.stringify({ promoId: promocaoId }));
        let result = await response.json();
        if(result.error){
            openErrorWindow(null, result.error);
            return false;
        }
        return result.verificar; // Retorna true se houver combos ativos, senão false
    } catch (error) {
        return false;
    }
}