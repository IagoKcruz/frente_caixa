import { MunicipioDTO } from '../../dtos/MunicipioDto.js';
import { openErrorWindow, openSuccessWindow } from '../WindowModal.js';
import { ajaxGet, ajaxPost } from '../FetchCommom.js'

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

        inserting: true, // Permite a inserção de dados
        editing: true,   // Permite a edição de dados
        sorting: true,   // Permite a ordenação dos dados
        paging: true,    // Habilita a paginação
        autoload: true,  // Carrega os dados automaticamente
        deleting: true,  // Permite a exclusão de dados

        data: Array.isArray(dataGrid) ? dataGrid : [],

        fields: [
            { name: "descricao", type: "text", title: "Município", width: 200, validate: "required" },
            { type: "control", editButton: true, deleteButton: true }
        ],

        // Evento de inserção
        onItemInserting: async function (args) {
            try {
                const municipioDTO = new MunicipioDTO(args.item); 
                args.cancel = true;
                
                const response = await ajaxPost('/caixa/municipio-criar', JSON.stringify(municipioDTO));
        
                const newMunicipio = await response.json();
        
                if (newMunicipio.error) {
                    throw new Error(newMunicipio.error); 
                }
        
                args.item.id = newMunicipio.id; 

                const grid = $("#jsGrid").jsGrid("instance");
                grid.insertItem(args.item)
            } catch (error) {
                // Se houve erro, cancela a inserção
                openErrorWindow(null, error); // Exibe a janela de erro
                args.cancel = true;  // Cancela a inserção
            }
        },
        

        // Evento de atualização
        onItemUpdating: async function (args) {
            try {
                // Atualização de dados via AJAX
                const response = await ajaxPut('/caixa/municipio-update', args.item);
                const updatedMunicipio = await response.json();
                if(updatedMunicipio.error){
                    throw new Error(updatedMunicipio.error);
                }
                args.item.id = updatedMunicipio.id; // Atualiza o ID retornado pela API
            } catch (error) {
                args.cancel = true; // Cancela a atualização em caso de erro
                openErrorWindow(null, error);
            }
        },

        // Evento de exclusão
        onItemDeleting: async function (args) {
            try {
                // Exclusão de dados via AJAX
                const response = await ajaxDelete('/caixa/municipio-delete', { id: args.item.id });
                const result = await response.json();
                if (!result.success) {
                    args.cancel = true; // Cancela a exclusão se falhar
                    openErrorWindow(null, "Falha ao excluir o item.");
                }
            } catch (error) {
                args.cancel = true; // Cancela a exclusão em caso de erro
                openErrorWindow(null, error);
            }
        }
    });
}


// Evento do botão "Filtrar"
document.getElementById("btnFiltrar").addEventListener("click", function () {
    const nome = document.getElementById("filterNome").value;
    carregarMunicipios(nome);
});

carregarMunicipios();