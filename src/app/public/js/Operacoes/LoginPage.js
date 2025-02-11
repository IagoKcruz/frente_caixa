import { ajaxGet, ajaxPost } from '../FetchCommom.js'
import { openErrorWindow, openSuccessWindow } from '../WindowModal.js';
let entrar, userEmail, code, campoSenha, buttonEmail, but_recuperar_codigo;

function eventLogin(){
    entrar.addEventListener("click", async (e)=>{
        e.preventDefault();
        let body = JSON.stringify({ email : userEmail.value, codigo : code.value });
        const resToken = await ajaxPost("/caixa/login",body)
        let response = await resToken.json();

        if(!response.error){
            localStorage.setItem("token", response.token)
            window.location.href = "/caixa/usuarios/page"
        }else{
            openErrorWindow(null, response.error)
        }
        console.log(token)
    })
}

function eventFindUser(){
    buttonEmail.addEventListener("click", async (e)=>{
        e.preventDefault();
        let body = JSON.stringify({ UserEmail : userEmail.value });
        const resToken = await ajaxPost("/caixa/find-user", body);
        let response = await resToken.json();

        if(!response.error){
            localStorage.setItem("codigo", response.code)
            abrirPopupCodigo(response.code)
        }else{
            openErrorWindow(null, response.error, cleanCampo)
        }
    })
}

function eventRecuperar_codigo(){
    but_recuperar_codigo.addEventListener("click", async (e)=>{
        e.preventDefault();
        _showCodigoRecuperado();
    })
}

function cleanCampo(){
    userEmail.value = "";
}

function abrirPopupCodigo(codigo){
    _showCamposCodigo()
    openSuccessWindow(null, codigo, setCodigo, codigo)
}

function setCodigo(codigo){
    code.value = codigo;
}

function _showCamposCodigo(){
    buttonEmail.classList.add('hidden')
    userEmail.disabled = true;
    campoSenha.classList.remove('hidden')
    campoSenha.style.webkitAppearance = 'none';
    entrar.classList.remove('hidden')
    but_recuperar_codigo.classList.remove('hidden')
    eventRecuperar_codigo();
}

function _hideCamposIniciais(){
    campoSenha.classList.add('hidden');
    entrar.classList.add('hidden');
    but_recuperar_codigo.classList.add('hidden');
}

function _showCodigoRecuperado(){
    let codigo = localStorage.getItem("codigo")
    openSuccessWindow(null, codigo, setCodigo, codigo)
}

function mapCampos(){
    entrar = document.getElementById("entrar")
    userEmail = document.getElementById("username")
    code = document.getElementById("code")
    campoSenha = document.getElementById("fieldCode")
    buttonEmail = document.getElementById("buttonEmail")
    but_recuperar_codigo = document.getElementById("recuperar_codigo")
}

mapCampos();
eventLogin();
eventFindUser();
_hideCamposIniciais();





