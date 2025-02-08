import { PromocaoDTO } from '../../dtos/PromocaoDto.js';
import { initializeWindowWithGrid, openErrorWindow, openSuccessWindow } from '../WindowModal.js';
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '../FetchCommom.js'

async function carregarPromocao(nome = "") {
    try {
        const response = await ajaxPost("/caixa/listar-Promocao", JSON.stringify({ nome }));
        const promocao = await response.json();
        montarGridPromocao(promocao.Promocoes);
    } catch (error) {
        openErrorWindow(null, error);
        montarGrid([]);
    }
}

function montarGridPromocao(dataGrid) {
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
            { name: "descricao", type: "text", title: "Descrição", width: 150, validate: "required" },
            { name: "valor_final", type: "number", title: "Valor Final", width: 100, readOnly: true },
            { name: "sn_ativo", type: "select", title: "Ativo", items: [{ Name: "Sim", Id: "S" }, { Name: "Não", Id: "N" }], valueField: "Id", textField: "Name", width: 80, validate: "required" },
            { type: "control", editButton: true, deleteButton: true },
            {
                name: "abrirComo", title: "Abrir SubGrid", width: 100,
                itemTemplate:  function (value, item) {
                    return $("<button>").text("Abrir Combo").on("click", async function (event) {
                        event.stopPropagation()
                        await abrirPopupCombos(item.combos_promocao, item.id);
                    });
                }
            }
        ],

        controller: {
            insertItem: async function (item) {
                return await createPromocao(item);
            },

            updateItem: async function (item) {
                return await updatePromocao(item);
            },

            deleteItem: async function (item) {
                return await deletePromocao(item);
            }
        }
    });
}

function abrirSubgridComboPromocao(data, items, promocaoId) {
    $("#gridWindow").jsGrid({
        width: "100%",

        inserting: true,
        editing: true,
        deleting: true,

        data: Array.isArray(data) ? data : [],

        fields: [
            { name: "id", type: "number", title: "ID", width: 50, readOnly: true, visible: false },
            { name: "valor_promocao", type: "number", title: "Valor Promoção", width: 100, validate: "required" },
            { name: "valor_percentagem", type: "number", title: "Valor Percentagem", width: 100, validate: "required" },
            { name: "valor_final_promocao", type: "number", title: "Valor Final Promoção", width: 100, readOnly: true },
            {
                name: "item_id", type: "select", title: "Item",
                items: items,
                valueField: "id", textField: "descricao",
                validate: "required", width: 150,
 
            },
            { type: "control", editButton: true, deleteButton: true }
        ],

        controller: {
            insertItem: async function (subitem) {
                return await createComboPromocao(subitem, promocaoId);
            },

            updateItem: async function (subitem) {
                return await updateComboPromocao(subitem, promocaoId);
            },

            deleteItem: async function (subitem) {
                return await deleteComboPromocao(subitem, promocaoId);
            }
        },

        onItemEditing: function(args) {
            const itemId = args.item.id;
            console.log("Editando o item com ID:", itemId);
            
            // Aqui você pode realizar alguma lógica para, por exemplo, carregar dados adicionais
            // ou preencher valores nas combos de edição, caso necessário.
        }
    });
}

async function createPromocao(item) {
    try {
        const promocaoDTO = new PromocaoDTO(item);
        const response = await ajaxPost('/caixa/Promocao-criar', JSON.stringify(promocaoDTO));
        const newPromocao = await response.json();

        if (newPromocao.error) throw new Error(newPromocao.error);

        return {
            id: newPromocao.Promocao.id,
            descricao: newPromocao.Promocao.descricao,
            valor_final: newPromocao.Promocao.valor_final,
            sn_ativo: newPromocao.Promocao.sn_ativo,
            comboPromocoes: newPromocao.Promocao.comboPromocoes // Exemplo de retorno com subgrid
        };
    } catch (error) {
        openErrorWindow(null, error);
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

async function createComboPromocao(subitem, promocaoId) {
    try {
        console.log(subitem, promocaoId)
        const comboPromocaoDTO = new ComboPromocaoDTO(subitem);
        comboPromocaoDTO.promocao_id = promocaoId;
        const response = await ajaxPost('/caixa/ComboPromocao-criar', JSON.stringify(comboPromocaoDTO));
        const newComboPromocao = await response.json();

        if (newComboPromocao.error) throw new Error(newComboPromocao.error);

        return {
            id: newComboPromocao.ComboPromocao.id,
            valor_promocao: newComboPromocao.ComboPromocao.valor_promocao,
            valor_percentagem: newComboPromocao.ComboPromocao.valor_percentagem,
            valor_final_promocao: newComboPromocao.ComboPromocao.valor_final_promocao,
            item_id: newComboPromocao.ComboPromocao.item_id
        };
    } catch (error) {
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}

async function updateComboPromocao(subitem) {
    try {
        const comboPromocaoDTO = new ComboPromocaoDTO(subitem);
        const response = await ajaxPut('/caixa/ComboPromocao-update', JSON.stringify(comboPromocaoDTO));
        const updatedComboPromocao = await response.json();

        if (updatedComboPromocao.error) throw new Error(updatedComboPromocao.error);

        return updatedComboPromocao.ComboPromocaoDTO;
    } catch (error) {
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}

async function deleteComboPromocao(subitem) {
    try {
        const bodyRequest = { id: subitem.id };
        const response = await ajaxDelete('/caixa/ComboPromocao-delete', JSON.stringify(bodyRequest));
        const result = await response.json();

        if (result.erro) throw new Error(result);

        return result;
    } catch (error) {
        openErrorWindow(null, error.Error);
        return $.Deferred().reject(error).promise();
    }
}


async function carregarItems(selectedValue) {
    var $select = $("<select>");

    const dataAjax = await ajaxGet("/caixa/listar-item-combo");
    const data = await dataAjax.json();
    console.log(data)
    return data.items;
}

async function abrirPopupCombos(data, promocaoId) {
    const items = await carregarItems();
    abrirSubgridComboPromocao(data, items, promocaoId);

    initializeWindowWithGrid();
}


document.getElementById("btnFiltrar").addEventListener("click", function () {
    const nome = document.getElementById("filterNome").value;
    carregarPromocao(nome);
});

carregarPromocao()