import { MunicipioDTO } from '../../dtos/MunicipioDto.js';
import { openErrorWindow, openSuccessWindow } from '../WindowModal.js';
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '../FetchCommom.js'

async function carregarMunicipios(nome = "") {
    try {
        const response = await ajaxPost("/caixa/listar-municipios", JSON.stringify({nome}));
        const municipios = await response.json();

        montarGrid(municipios.Municipios);
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
            { name: "descricao", type: "text", title: "Município", align: 'left', width: 200, validate: "required" },
            { type: "control", editButton: true, deleteButton: true }
        ],

        controller: {

            // Insere um novo item (CREATE)
            insertItem: async function (item) {
                return await createMunicipio(item);
            },

            updateItem: async function (item) {
                return await updateMunicipio(item);
            },
            
            deleteItem: async function (item) {
                return await deleteMunicipio(item);
            }
        }
    });
}

async function createMunicipio(item) {
    try {
        const municipioDTO = new MunicipioDTO(item);
        const response = await ajaxPost('/caixa/municipio-criar', JSON.stringify(municipioDTO));
        const newMunicipio = await response.json();

        if (newMunicipio.error) throw new Error(newMunicipio.error);

        return {
            id: newMunicipio.municipio.id,
            descricao: newMunicipio.municipio.descricao
        };
    } catch (error) {
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}

async function updateMunicipio(item) {
    try {
        const municipioDTO = new MunicipioDTO(item);
        
        const response = await ajaxPut('/caixa/municipio-update', JSON.stringify(municipioDTO));
        const updatedMunicipio = await response.json();

        if (updatedMunicipio.error) throw new Error(updatedMunicipio.error);

        return updatedMunicipio.MunicipioDTO;
    } catch (error) {
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}


async function deleteMunicipio(item) {
    try {
        const bodyRequest = { id: item.id };
        const response = await ajaxDelete('/caixa/municipio-delete', JSON.stringify(bodyRequest));
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
    const nome = document.getElementById("filtroNome").value;
    carregarMunicipios(nome);
});

carregarMunicipios();