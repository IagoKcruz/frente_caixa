function formatMessage(message) {
    if (!message) return "<span>Mensagem vazia</span>";
    
    if (typeof message === "string" || typeof message === "number") {
        return `<span>${message}</span>`;
    }
    
    if (Array.isArray(message)) {
        const errorList = message.map(formatErrorMessage).join("");
        return `<ul class='list-none p-0'>${errorList}</ul>`;
    }
    
    if (typeof message === "object" && message.erro) {
        return `<span>${message.erro}</span>`;
    }
    
    return `<span>${JSON.stringify(message)}</span>`;
}

function formatErrorMessage(error) {
    if (error.erro) return `<li>${error.erro}</li>`;
    if (error.Error) return `<li>${error.Error}</li>`;
    return `<li>${error}</li>`;
}

export function openSuccessWindow(title = "Sucesso Window", message, onConfirm = null, param = null) {
    createModal(title || "Sucesso", formatMessage(message), "border-green-600", onConfirm, false, param);
}

export function openErrorWindow(title = "Erro Window", errors, onConfirm = null, param = null) {
    createModal(title || "Erro", formatMessage(errors), "border-red-600", onConfirm, false, param);
}

export function openInfoWindow(title = "Info Window", message, onConfirm = null, param = null) {
    createModal(title || "Informação", formatMessage(message), "border-orange-500", onConfirm, false, param);
}

export function openDialogWindow(title, message, onConfirm = null, param = null) {
    createModal(title || "Confirmação", formatMessage(message), "border-gray-400", onConfirm, true, param);
}

export function openDialogIncluir(title, message, onConfirm = null, param = null) {
    createModal(title || "Confirmação", formatMessage(message), "border-green-600", onConfirm, true, param);
}

export function openDialogRemove(title, message, onConfirm = null, param = null) {
    createModal(title || "Atenção", formatMessage(message), "border-red-600", onConfirm, true, param);
}

function createModal(title, content, borderColor, onConfirm = null, isDialog = false, param = null) {
    document.getElementById("modal-overlay")?.remove();

    const overlay = document.createElement("div");
    overlay.id = "modal-overlay";
    overlay.className = "fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50";

    const modal = document.createElement("div");
    modal.className = `bg-white p-5 rounded-lg shadow-lg border-4 ${borderColor} relative max-w-full overflow-auto`;
    modal.style.minWidth = "300px";
    modal.style.minHeight = "150px";
    modal.style.maxWidth = "500px";
    modal.style.maxHeight = "80vh";

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


export function initializeWindowWithGrid(contentFunction = null) {
    const windowElement = document.getElementById("window");
    const gridWindowElement = document.getElementById("gridWindow");

    // Garantir que a janela esteja oculta ao inicializar
    windowElement.style.display = "flex";

    // Estilizando a janela
    windowElement.style.position = "fixed";
    windowElement.style.top = "0";
    windowElement.style.left = "0";
    windowElement.style.width = "100%";
    windowElement.style.height = "100vh"; // A tela ocupa 100% da altura
    windowElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Fundo semitransparente
    windowElement.style.justifyContent = "center"; // Centraliza o conteúdo
    windowElement.style.alignItems = "center"; // Alinha ao centro
    windowElement.style.padding = "2rem"; // Altura de 80% da tela

    // Estilizando a área da grid
    gridWindowElement.style.position = "relative";
    gridWindowElement.style.marginLeft = "64px";
    gridWindowElement.style.height = "auto"; // Altura de 80% da tela
    gridWindowElement.style.backgroundColor = "white"; // Fundo branco
    gridWindowElement.style.borderRadius = "10px"; // Bordas arredondadas
    gridWindowElement.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)"; // Sombra leve
    gridWindowElement.style.overflow = "auto"; // Permitir rolagem caso o conteúdo ultrapasse a altura

    // Adicionar um botão de fechar
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&times;";
    closeButton.className = "absolute top-2 right-2 text-2xl text-gray-600 cursor-pointer hover:text-red-600";
    closeButton.onclick = () => {
        windowElement.style.display = "none"; // Fecha a janela ao clicar no botão
    };
    gridWindowElement.appendChild(closeButton);

    // Se for fornecida uma função de conteúdo, executá-la
    if (typeof contentFunction === "function") {
        contentFunction(gridWindowElement); // Passa o elemento de grid para ser manipulado
    }

    // Adicionar evento para fechar ao clicar fora da grid
    windowElement.onclick = function(event) {
        if (event.target === windowElement) {
            windowElement.style.display = "none"; // Fecha a janela ao clicar fora
        }
    };
}

