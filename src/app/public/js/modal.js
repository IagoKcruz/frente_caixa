export function openSuccessWindow(title = "Sucesso Window", message, onConfirm = null, param = null) {
    createModal(title || "Sucesso", message, "border-green-600", onConfirm, false, param);
}

export function openErrorWindow(title = "Erro Window", errors, onConfirm = null, param = null) {
    if (!Array.isArray(errors)) {
        errors = [{ erro: errors }];
    }
    const message = errors.map(e => `<span>${e.erro}</span>`).join(" ");
    createModal(title || "Erro", message, "border-red-600", onConfirm, false, param);
}

export function openInfoWindow(title = "Info Window", message, onConfirm = null, param = null) {
    createModal(title || "Informação", message, "border-orange-500", onConfirm, false, param);
}

export function openDialogWindow(title, message, onConfirm = null, param = null) {
    createModal(title || "Confirmação", message, "border-gray-400", onConfirm, true, param);
}

export function openDialogIncluir(title, message, onConfirm = null, param = null) {
    createModal(title || "Confirmação", message, "border-green-600", onConfirm, true, param);
}

export function openDialogRemove(title, message, onConfirm = null, param = null) {
    createModal(title || "Atenção", message, "border-red-600", onConfirm, true, param);
}

function createModal(title, content, borderColor, onConfirm = null, isDialog = false, param = null) {
    document.getElementById("modal-overlay")?.remove();

    const overlay = document.createElement("div");
    overlay.id = "modal-overlay";
    overlay.className = "fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50";

    const modal = document.createElement("div");
    modal.className = `bg-white p-5 rounded-lg shadow-lg w-96 max-w-full border-4 ${borderColor} relative`;

    const header = document.createElement("div");
    header.className = "flex justify-between items-center bg-gray-100 p-3 rounded-t-md";
    
    const titleElement = document.createElement("h2");
    titleElement.className = "text-lg font-semibold";
    titleElement.innerText = title;

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&times;";
    closeButton.className = "text-gray-600 text-xl font-bold cursor-pointer hover:text-red-600";
    closeButton.onclick = () => overlay.remove();

    header.appendChild(titleElement);
    header.appendChild(closeButton);
    modal.appendChild(header);

    const body = document.createElement("div");
    body.className = "p-3 text-center";
    body.innerHTML = content;
    modal.appendChild(body);

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "flex justify-center gap-3 mt-4";

    const okButton = document.createElement("button");
    okButton.textContent = "OK";
    okButton.className = "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700";
    okButton.onclick = () => {
        overlay.remove();
        if (typeof onConfirm === "function") {
            param !== null ? onConfirm(param) : onConfirm();
        }
    };

    buttonContainer.appendChild(okButton);

    if (isDialog) {
        const cancelButton = document.createElement("button");
        cancelButton.textContent = "NÃO";
        cancelButton.className = "bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500";
        cancelButton.onclick = () => overlay.remove();

        buttonContainer.appendChild(cancelButton);
    }

    modal.appendChild(buttonContainer);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}
