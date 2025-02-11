import { FormaPagamentoDTO } from '../../../dtos/FormaPagamentoDto.js';
import { initializeWindowWithGrid, openErrorWindow, openSuccessWindow } from '../WindowModal.js';
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '../FetchCommom.js'

async function carregarFormaPagamento(descricao = "") {
    try {
        const response = await ajaxPost("/caixa/listar-FormaPagamento", JSON.stringify({ descricao }));
        const formaPagamento = await response.json();

        montarGridFormaPagamento(formaPagamento.Promocoes, formaPagamento.tipo_recebimento);
    } catch (error) {
        openErrorWindow(null, error.error);
    }
}

function gerarTemplateSelect(value, nomeId, tipo_recebimento, id) {
    const select = $("<select>").attr("id", nomeId).attr("class", (id ?? ""));

    tipo_recebimento.forEach(option => {
        select.append($("<option>").attr("value", option.id).text(option.descricao));
    });

    if (value) select.val(value);
    return select;
}

function montarGridFormaPagamento(dataGrid, tipo_recebimento) {
    $("#jsGrid").jsGrid({
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
            { name: "codigo", type: "text", title: "Descrição", width: 150 },
            { name: "descricao", type: "text", title: "Descrição", width: 150 },
            {
                name: "tipo_recebimento_id",
                type: "number",
                item: tipo_recebimento,
                title: "Tipo Recebimento",
                valueField: "id", textField: "descricao",
                width: 100,

                insertTemplate: function (item) {
                    return gerarTemplateSelect("", "insertTipo_recebimento_novo", tipo_recebimento)
                },
                editTemplate: function (value, item) {
                    return gerarTemplateSelect(item.id ?? 0, "editTipo_recebimento", tipo_recebimento, item.id ?? 0)
                },
                insertValue: function () {
                    return $("#insertTipo_recebimento_novo").val();
                },
                editValue: function () {
                    return $("#editTipo_recebimento").val();
                }
            },
            {
                name: "sn_promocao_geral",
                type: "select",
                title: "Promoção Geral",
                width: 80,
                insertTemplate: function () {
                    return $("<input>").attr("id", "insertQntParcelas_novo").attr("type", "number");
                },
                editTemplate: function (value, item) {
                    return $("<input>").attr("id", "editQntParcelas").attr("type", "number").val(value);
                },
                insertValue: function () {
                    return $("#insertQntParcelas_novo").val().prop("disabled", true);
                },
                editValue: function (item) {
                    return $("#editQntParcelas").val();
                }
            },
            { type: "control", editButton: true, deleteButton: false },
            {
                title: "Delete",
                itemTemplate: function (value, item) {
                    console.log(value, item);
                    return $("<button>")
                        .text("Excluir")
                        .addClass("btn btn-danger")
                        .on("click", async function (event) {
                            event.stopPropagation()
                            // Chama a função de exclusão passando o item
                            openDialogWindow(null, "Deseja deletar eest item", deleteComboPromocao, item)
                        });
                }
            }
        ],

        controller: {
            insertItem: async function (item) {
                item.cancel = true;

                let result = await createFormaPagamento(item);

                if (result === false) {
                    this.cancelEdit();
                    return false;  // Impede a inserção do item na grid
                }

                return result;
            },

            updateItem: async function (item) {
                const result = await updateFormaPagamento(item);

                if (result === false) {
                    this.cancelEdit();
                    return false;  // Impede a inserção do item na grid
                }

                return result;
            }
        },
    });
}

async function createFormaPagamento(item) {
    try {
        const formapagamentoTO = new FormaPagamentoDTO(item);
        const response = await ajaxPost('/caixa/FormaPagamento-criar', JSON.stringify(formapagamentoTO));
        const formaPagamento = await response.json();


        if (formaPagamento.error) {
            openErrorWindow(null, formaPagamento.error);
            return false;
        }

        return {
            id: formaPagamento.forma.id,
            descricao: formaPagamento.forma.codigo,
            descricao: formaPagamento.forma.descricao,
            descricao: formaPagamento.forma.tipo_recebimento_id,
            descricao: formaPagamento.forma.parcelas,
        };
    } catch (error) {
        openErrorWindow(null, error.error || error.errors);
        return $.Deferred().reject(error).promise();
    }
}

async function updateFormaPagamento(item) {
    try {
        const formapagamento = new FormaPagamentoDTO(item);
        const response = await ajaxPut('/caixa/FormaPagamento-update', JSON.stringify(formapagamento));
        const updatedFormaPagamento = await response.json();

        if (updatedFormaPagamento.error) {
            openErrorWindow(null, updatedFormaPagamento.error);
            return false;
        }

        return updatedFormaPagamento.formaPagamento;
    } catch (error) {
        $("#jsGrid").jsGrid("cancelInsert");
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}

export async function deleteFormaPagamento(subitem) {
    try {
        const bodyRequest = { id: subitem.id };
        const response = await ajaxDelete('/caixa/FormaPagamento-delete', JSON.stringify(bodyRequest));
        const result = await response.json();

        if (result.error) {
            openErrorWindow(null, result.error);
            return;
        }
        $("#jsGrid").jsGrid("deleteItem", subitem);
    } catch (error) {
        openErrorWindow(null, error.Error);
        return false;
    }
}


// Aplica a função sempre que o campo `sn_FormaPagamento_geral` for alterado
$(document).on("change", "#insertTipo_recebimento_novo", async function () {
    const snPromocaoGeral = $("#insertTipo_recebimento_novo").val();
    const precisaDeParceals = ["1","4", "8"]

    if (precisaDeParceals.includes(snPromocaoGeral)) {
        // Habilita o campo valor_final
        $("#insertQntParcelas_novo").prop("disabled", false);
    } else {
        // Desabilita o campo valor_final
        $("#insertQntParcelas_novo").prop("disabled", true).val("");
    }
});

$(document).on("change", "#editTipo_recebimento", async function () {
    const snPromocaoGeral = $("#editTipo_recebimento").val();
    const precisaDeParceals = ["1","4", "8"]

    if (precisaDeParceals.includes(snPromocaoGeral)) {
        // Habilita o campo valor_final
        $("#editQntParcelas").prop("disabled", false);
    } else {
        // Desabilita o campo valor_final
        $("#editQntParcelas").prop("disabled", true).val("");
    }
});


document.getElementById("btnFiltrar").addEventListener("click", async function () {
    const descricao = document.getElementById("filtroNome").value;
    await carregarFormaPagamento(descricao);
});

carregarFormaPagamento()