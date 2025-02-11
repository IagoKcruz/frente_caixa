import { openErrorWindow, openSuccessWindow } from '../WindowModal.js';
import { ajaxGet, ajaxPost, ajaxPut, ajaxDelete } from '../FetchCommom.js'
import { UsuarioDTO } from '../../dtos/UsuarioDto.js';

async function carregarUsuarios(nome = "") {
    try {
        const response = await ajaxPost("/caixa/listar-Usuarios", JSON.stringify({ nome }));
        const usuario = await response.json();
        montarGrid(usuario.usuarios);
    } catch (error) {
        openErrorWindow(null, error);
        montarGrid([]);
    }
}

function montarGrid(dataGrid) {
    $("#jsGrid").jsGrid({
        height: "auto",
        width: "100%",

        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        autoload: false,
        deleting: true,

        data: Array.isArray(dataGrid) ? dataGrid : [],  // Aqui você coloca os dados que vêm do backend

        fields: [
            {
                name: "nome",
                title: "Nome",
                type: "text",
                width: 150, readOnly: true
            },
            {
                name: "email",
                title: "Email",
                type: "text",
                width: 200, readOnly: true
            },
            {
                name: "login",
                title: "Login",
                type: "text",
                width: 150, readOnly: true
            },
            {
                name: "grupo_usuario_id",
                title: "Grupo",
                type: "select",
                items: [
                    { Name: "ADMIN", Id: 1 },
                    { Name: "CLIENTE", Id: 2 }
                ],
                valueField: "Id",
                textField: "Name",
                width: 150
            },
            { type: "control", editButton: true, deleteButton: false }
        ],
        controller: {
            updateItem: async function (item) {
                const result = await updateUsuario(item);

                if (result === false) {
                    this.cancelEdit();
                    return false;  // Impede a atualização do item na grid
                }

                return result;
            }
        }
    }
    );
}

async function updateUsuario(item) {
    try {
        const usuarioDTO = new UsuarioDTO(item);
        
        const response = await ajaxPut('/caixa/Usuario-update', JSON.stringify(usuarioDTO));
        const updatedUsuario = await response.json();

        if (updatedUsuario.error) {
            openErrorWindow(null, updatedUsuario.error);
            return false;
        }
        openSuccessWindow(null, "Sucesso ao alterar usuário");
        return updatedUsuario.usuario;
    } catch (error) {
        $("#jsGridUsuario").jsGrid("cancelInsert");
        openErrorWindow(null, error);
        return $.Deferred().reject(error).promise();
    }
}

// Evento do botão "Filtrar"
document.getElementById("btnFiltrar").addEventListener("click", async function () {
    const nome = document.getElementById("filtroNome").value;
    await carregarUsuarios(nome);
});

await carregarUsuarios();