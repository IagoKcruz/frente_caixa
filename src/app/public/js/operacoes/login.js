let entrar, userEmail, code, campoSenha, buttonEmail;

function eventLogin(){
    entrar.addEventListener("click", async (e)=>{
        e.preventDefault();
        let body = JSON.stringify({ email : userEmail.value, codigo : code.value });
        const resToken = await fetch("/caixa/login", {headers: { "Content-Type": "application/json" }, body: body, method : "POST"})
        let token = await resToken.json();
        if(!token.error){
            localStorage.setItem("token", token)
            window.location.href = "/caixa/dashboardadmin"
        }
        console.log(token)
    })
}

function eventFindUser(){
    buttonEmail.addEventListener("click", async (e)=>{
        e.preventDefault();
        console.log(userEmail.value)
        let body = JSON.stringify({ UserEmail : userEmail.value });
        const resToken = await ajaxPost("/caixa/find-user", body)
        let response = await resToken.json();
        if(!response.error){
            abrirPopupCodigo(response.code)
        }else{
            console.log(response.error)
        }
    })
}

function abrirPopupCodigo(codigo){
    showCamposCodigo()
    alert(codigo);
}

function showCamposCodigo(){
    buttonEmail.style.display = "none";
    userEmail.disabled = true;
    campoSenha.style.display = "flex";
    entrar.style.display = "flex"
}

function _hideCamposIniciais(){
    campoSenha.style.display = "none";
    entrar.style.display = "none";
}

function mapCampos(){
    entrar = document.getElementById("entrar")
    userEmail = document.getElementById("username")
    code = document.getElementById("code")
    campoSenha = document.getElementById("fieldCode")
    buttonEmail = document.getElementById("buttonEmail")
}

mapCampos();
eventLogin();
eventFindUser();
_hideCamposIniciais();





async function ajaxPost(caminho ,body){
    return fetch(caminho, {headers: { "Content-Type": "application/json" }, body: body, method : "POST"})
}

async function ajaxGet(caminho ,body){
    return await fetch(caminho, {headers: { "Content-Type": "application/json" }, body: body, method : "GET"})
}