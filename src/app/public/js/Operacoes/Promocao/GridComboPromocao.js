import { ComboPromocaoDTO } from '../../../dtos/ComboPromocaoDto.js';
import { initializeWindowWithGrid, openDialogWindow, openErrorWindow, openSuccessWindow } from '../../WindowModal.js';
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '../../FetchCommom.js'
// Função para abrir a subgrid com os combos
function abrirSubgridComboPromocao(data, items, promocaoId) {
    $("#gridWindow").jsGrid({
        width: "100%",
        inserting: true,
        editing: true,
        deleting: true,
        deleting: false,

        data: Array.isArray(data) ? data : [],
        fields: [
            { name: "id", type: "number", title: "ID", width: 50, readOnly: true, visible: false },
            { name: "valor_promocao", type: "number", title: "Valor Promoção", width: 100 },
            {
                name: "item_id", type: "select", title: "Item",
                items: items,
                valueField: "id", textField: "descricao",
                width: 150,
            },
            { name: "sn_percentagem", type: "select", title: "Valor em %", items: [{ Name: "Sim", Id: "S" }, { Name: "Não", Id: "N" }], valueField: "Id", textField: "Name", width: 80 },
            {
                title: "Delete",
                itemTemplate: function(value, item) {
                    return $("<button>")
                    .text("Excluir")
                    .addClass("btn btn-danger")
                    .on("click", async function(event) {
                        event.stopPropagation()
                        // Chama a função de exclusão passando o item
                        openDialogWindow(null,"Deseja deletar eest item", deleteComboPromocao, item)
                    });
                }
            },
            { type: "control", editButton: true, deleteButton: false }
        ],
        controller: {
            insertItem: async function (subitem) {
                let result = await createComboPromocao(subitem, promocaoId);
                if (result === false) {
                    // Se a inserção falhou (erro do backend), cancela a edição e não insere o item
                    this.cancelEdit();
                    return false;  // Impede a inserção do item na grid
                }

                // Se a inserção for bem-sucedida, retorna os dados para a grid
                return result;
            },
            updateItem: async function (subitem) {
                let result = updateComboPromocao(subitem, promocaoId);

                if (result === false) {
                    // Se a inserção falhou (erro do backend), cancela a edição e não insere o item
                    this.cancelEdit();
                    return false;  // Impede a inserção do item na grid
                }

                // Se a inserção for bem-sucedida, retorna os dados para a grid
                return result;
            }
        }
    });
}

// Função para carregar os itens da lista para o select
async function carregarItems(selectedValue) {
    const dataAjax = await ajaxGet("/caixa/listar-item-combo");
    const data = await dataAjax.json();
    return data.items;
}

// Função para abrir o popup dos combos
export async function abrirPopupCombos(sn_promocao_geral, data, promocaoId) {
    if (sn_promocao_geral == "N") {
        const items = await carregarItems();
        abrirSubgridComboPromocao(data, items, promocaoId);
        initializeWindowWithGrid();
    }
}

// Funções de CRUD para ComboPromoção
export async function createComboPromocao(subitem, promocaoId) {
    try {
        const comboPromocaoDTO = new ComboPromocaoDTO(subitem);
        comboPromocaoDTO.promocao_id = promocaoId;
        const response = await ajaxPost('/caixa/ComboPromocao-criar', JSON.stringify(comboPromocaoDTO));
        const newComboPromocao = await response.json();

        if (newComboPromocao.error) {
            openErrorWindow(null, newComboPromocao.error);
            return false;
        }

        return {
            id: newComboPromocao.combo.id,
            valor_promocao: newComboPromocao.combo.valor_promocao,
            sn_percentagem: newComboPromocao.combo.sn_percentagem,
            item_id: newComboPromocao.combo.item_id
        };
    } catch (error) {
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}

export async function updateComboPromocao(subitem, promocaoId) {
    try {
        const comboPromocaoDTO = new ComboPromocaoDTO(subitem);
        comboPromocaoDTO.promocao_id = promocaoId;
        const response = await ajaxPut('/caixa/ComboPromocao-update', JSON.stringify(comboPromocaoDTO));
        const updatedComboPromocao = await response.json();

        console.log(updatedComboPromocao)

        if (!updatedComboPromocao.combo) {
            this.cancelEdit();
            openErrorWindow(null, updatedComboPromocao.error);
            return false;
        }

        return updatedComboPromocao.combo;
    } catch (error) {
        $("#jsGridPromocao").jsGrid("cancelUpdate");
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}

export async function deleteComboPromocao(subitem) {
    try {
        const bodyRequest = { id: subitem.id };
        const response = await ajaxDelete('/caixa/ComboPromocao-delete', JSON.stringify(bodyRequest));
        const result = await response.json();

        console.log(result)
        if (result.error) {
            openErrorWindow(null, result.error);
            return;
        }
        $("#jsGridPromocao").jsGrid("deleteItem", subitem);
    } catch (error) {
        openErrorWindow(null, error.Error);
        return false;
    }
}
