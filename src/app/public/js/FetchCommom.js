export async function ajaxPost(caminho, body) {
    return fetch(caminho, {
        headers: { "Content-Type": "application/json" },
        body: body,
        method: "POST"
    });
}

export async function ajaxGet(caminho) {
    return await fetch(caminho, {
        headers: { "Content-Type": "application/json" },
        body: body,
        method: "GET"
    });
}

export async function ajaxPut(caminho) {
    return await fetch(caminho, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        method: "PUT"
    });
}