import { CategoriaDTO } from '../../dtos/CategoriaDto.js';
import { openErrorWindow, openSuccessWindow } from '../WindowModal.js';
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '../FetchCommom.js'

async function carregarCategorias(nome = "") {
    try {
        const response = await ajaxPost("/caixa/listar-Categoria", JSON.stringify({nome}));
        const categorias = await response.json();

        montarGrid(categorias.Categorias);
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
            { name: "descricao", type: "text", title: "Categoria", align: 'left', width: 200, validate: "required" },
            { type: "control", editButton: true, deleteButton: true }
        ],

        controller: {
            insertItem: async function (item) {
                return await createCategoria(item);
            },

            updateItem: async function (item) {
                return await updateCategoria(item);
            },
            
            deleteItem: async function (item) {
                return await deleteCategoria(item);
            }
        }
    });
}

async function createCategoria(item) {
    try {
        const categoriaDTO = new CategoriaDTO(item);
        const response = await ajaxPost('/caixa/Categoria-criar', JSON.stringify(categoriaDTO));
        const newCategoria = await response.json();

        if (newCategoria.error) throw new Error(newCategoria.error);

        return {
            id: newCategoria.Categoria.id,
            descricao: newCategoria.Categoria.descricao
        };
    } catch (error) {
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}

async function updateCategoria(item) {
    try {
        const categoriaDTO = new CategoriaDTO(item);
        
        const response = await ajaxPut('/caixa/Categoria-update', JSON.stringify(categoriaDTO));
        const updatedCategoria = await response.json();

        if (updatedCategoria.error) throw new Error(updatedCategoria.error);

        return updatedCategoria.CategoriaDTO;
    } catch (error) {
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}


async function deleteCategoria(item) {
    try {
        const bodyRequest = { id: item.id };
        const response = await ajaxDelete('/caixa/Categoria-delete', JSON.stringify(bodyRequest));
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
    carregarCategorias(nome);
});

carregarCategorias();