import { UnidadeMedidaDTO } from '../../dtos/UnidadeMedidaDto.js';
import { openErrorWindow, openSuccessWindow } from '../WindowModal.js';
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '../FetchCommom.js'

async function carregarUnidadeMedidas(nome = "") {
    try {
        const response = await ajaxPost("/caixa/listar-UnidadeMedida", JSON.stringify({nome}));
        const UnidadeMedidas = await response.json();

        montarGrid(UnidadeMedidas.UnidadeMedidas);
    } catch (error) {
        console.log(error)
        openErrorWindow(null, error);
        montarGrid([]);
    }
}

function montarGrid(dataGrid) {
    $("#jsGrid").jsGrid({
        width: "100%",
        height: "400px",

        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        autoload: false,
        deleting: true,

        data: Array.isArray(dataGrid) ? dataGrid : [],

        fields: [
            { name: "id", type: "number", title: "ID", width: 50, readOnly: true, visible: false },
            { name: "descricao", type: "text", title: "Unidade de Medida", align: 'left', width: 200, validate: "required" },
            { type: "control", editButton: true, deleteButton: true }
        ],

        controller: {
            insertItem: async function (item) {
                return await createUnidadeMedida(item);
            },

            updateItem: async function (item) {
                return await updateUnidadeMedida(item);
            },
            
            deleteItem: async function (item) {
                return await deleteUnidadeMedida(item);
            }
        }
    });
}

async function createUnidadeMedida(item) {
    try {
        const unidadeMedidaDTO = new UnidadeMedidaDTO(item);
        const response = await ajaxPost('/caixa/UnidadeMedida-criar', JSON.stringify(unidadeMedidaDTO));
        const newUnidadeMedida = await response.json();

        if (newUnidadeMedida.error) throw new Error(newUnidadeMedida.error);

        return {
            id: newUnidadeMedida.unidadeMedida.id,
            descricao: newUnidadeMedida.unidadeMedida.descricao
        };
    } catch (error) {
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}

async function updateUnidadeMedida(item) {
    try {
        const unidadeMedidaDTO = new UnidadeMedidaDTO(item);
        
        const response = await ajaxPut('/caixa/UnidadeMedida-update', JSON.stringify(unidadeMedidaDTO));
        const updatedUnidadeMedida = await response.json();

        if (updatedUnidadeMedida.error) throw new Error(updatedUnidadeMedida.error);

        return updatedUnidadeMedida.UnidadeMedidaDTO;
    } catch (error) {
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}


async function deleteUnidadeMedida(item) {
    try {
        const bodyRequest = { id: item.id };
        const response = await ajaxDelete('/caixa/UnidadeMedida-delete', JSON.stringify(bodyRequest));
        const result = await response.json();

        if (result.erro) throw new Error(result);
        
        return result;
    } catch (error) {
        openErrorWindow(null, error.Error);
        return $.Deferred().reject(error).promise();
    }
}



// Evento do botão "Filtrar"
document.getElementById("btnFiltrar").addEventListener("click", function () {
    const nome = document.getElementById("filterNome").value;
    carregarUnidadeMedidas(nome);
});

carregarUnidadeMedidas();