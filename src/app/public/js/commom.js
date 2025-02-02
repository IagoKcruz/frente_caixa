export async function ajaxPost(caminho ,body){
    return fetch(caminho, {headers: { "Content-Type": "application/json" }, body: body, method : "POST"})
}

export async function ajaxGet(caminho ,body){
    return await fetch(caminho, {headers: { "Content-Type": "application/json" }, body: body, method : "GET"})
}