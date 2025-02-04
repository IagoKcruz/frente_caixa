import { openErrorWindow, openSuccessWindow } from '../WindowModal.js';
import { ajaxGet, ajaxPost } from '../FetchCommom.js'

async function carregarMunicipios(nome = "") {
    try {
        const response = await ajaxPost("/caixa/listar-municipios", JSON.stringify({nome : nome}));
        const municipios = await response.json();

        montarGrid(municipios);
    } catch (error) {
        console.log(error)
        openErrorWindow(null, error);
        montarGrid([]);
    }
}

function montarGrid(data) {
    $("#jsGrid").jsGrid({
        width: "100%",
        height: "400px",

        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        autoload: true,

        data: Array.isArray(data) ? data : [],

        fields: [
            { name: "descricao", type: "text", title: "Município", width: 200, validate: "required" },
            { type: "control" }
        ],

        // Criar novo município
        onItemInserting: function (args) {
            args.item._isInserting = true; // Marca que estamos inserindo um novo item
            showCancelButton(args);
        },

        // Editar município
        onItemUpdating: function (args) {
            args.item._isInserting = false; // Marca que estamos atualizando um item existente
            showCancelButton(args);
        },

        // Função para mostrar o botão de cancelar
        showCancelButton: function(args) {
            const grid = $("#jsGrid").jsGrid("instance");

            // Adicionando o botão de cancelar
            const cancelButton = $("<button>")
                .addClass("bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700")
                .text("Cancelar")
                .click(function() {
                    // Cancela a operação de inserção ou atualização
                    grid.cancelEdit();
                });

            // Adiciona o botão ao container
            const container = $(args.row).find(".jsgrid-insert-row, .jsgrid-edit-row");
            if (!container.find("button.bg-red-600").length) {
                container.append(cancelButton);
            }
        },

        // Criar novo município - confirmar a inserção
        onItemInserting: async function (args) {
            try {
                const response = await ajaxPost('/caixa/municipio-criar', args.item);
                const newMunicipio = await response.json();
                args.item.id = newMunicipio.id;
            } catch (error) {
                args.cancel = true;
                openErrorWindow(error);
            }
        },

        // Editar município - confirmar a atualização
        onItemUpdating: async function (args) {
            try {
                const response = await ajaxPut('/caixa/municipio-update', args.item);
                const updatedMunicipio = await response.json();
                args.item.id = updatedMunicipio.id;
            } catch (error) {
                args.cancel = true;
                openErrorWindow(error);
            }
        }
    });
}


// Evento do botão "Filtrar"
document.getElementById("btnFiltrar").addEventListener("click", function () {
    const nome = document.getElementById("filterNome").value;
    carregarMunicipios(nome);
});

// Carregar a grid ao iniciar
carregarMunicipios();
