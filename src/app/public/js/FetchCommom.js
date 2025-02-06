export async function ajaxPost(caminho, body) {
    return fetch(caminho, {
        headers: { "Content-Type": "application/json" },
        body: body,
        method: "POST"
    });
}

export async function ajaxGet(caminho, body) {
    return await fetch(caminho, {
        headers: { "Content-Type": "application/json" },
        body: body,
        method: "GET"
    });
}

export async function ajaxPut(caminho, body) {
    return await fetch(caminho, {
        headers: { "Content-Type": "application/json" },
        body: body,
        method: "PUT"
    });
}

export async function ajaxDelete(caminho, body) {
    return await fetch(caminho, {
        headers: { "Content-Type": "application/json" },
        body: body,
        method: "DELETE"
    });
}