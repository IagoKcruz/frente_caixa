import { ComboPromocaoDTO } from '../../../dtos/ComboPromocaoDto.js';
import { initializeWindowWithGrid, openErrorWindow, openSuccessWindow } from '../../WindowModal.js';
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '../../FetchCommom.js'
// Função para abrir a subgrid com os combos
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
            {
                name: "item_id", type: "select", title: "Item",
                items: items,
                valueField: "id", textField: "descricao",
                validate: "required", width: 150,
            },
            { name: "sn_percentagem", type: "select", title: "Valor em %", items: [{ Name: "Sim", Id: "S" }, { Name: "Não", Id: "N" }], valueField: "Id", textField: "Name", width: 80, validate: "required" },
            { type: "control", editButton: true, deleteButton: true }
        ],
        controller: {
            insertItem: async function(subitem) {
                return await createComboPromocao(subitem, promocaoId);
            },
            updateItem: async function(subitem) {
                return await updateComboPromocao(subitem, promocaoId);
            },
            deleteItem: async function(subitem) {
                return await deleteComboPromocao(subitem, promocaoId);
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
    if(sn_promocao_geral == "N"){
        const items = await carregarItems();
        abrirSubgridComboPromocao(data, items, promocaoId);
        initializeWindowWithGrid();
    }
}

// Funções de CRUD para ComboPromoção
async function createComboPromocao(subitem, promocaoId) {
    try {
        const comboPromocaoDTO = new ComboPromocaoDTO(subitem);
        comboPromocaoDTO.promocao_id = promocaoId;
        const response = await ajaxPost('/caixa/ComboPromocao-criar', JSON.stringify(comboPromocaoDTO));
        const newComboPromocao = await response.json();
        if (newComboPromocao.error) throw new Error(newComboPromocao.error);

        return {
            id: newComboPromocao.ComboPromocao.id,
            valor_promocao: newComboPromocao.ComboPromocao.valor_promocao,
            sn_percentagem: newComboPromocao.ComboPromocao.sn_percentagem,
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
