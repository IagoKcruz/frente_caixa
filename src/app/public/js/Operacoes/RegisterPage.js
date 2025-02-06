import { ClienteDTO } from '../../dtos/ClienteDto.js';
import { openErrorWindow, openSuccessWindow } from '../WindowModal.js';
import { ajaxGet, ajaxPost } from '../FetchCommom.js'

let nome, documento, rg, dataNascimento, email, bairro, logradouro, numeroLogradouro, municipioId, inscricaoEstadual, promocaoId, registrarBtn, radioCPF, radioCNPJ, documentoInput;

function getDadosTela() {
    nome = document.getElementById("nome");
    documento = document.getElementById("documento");
    rg = document.getElementById("rg");
    dataNascimento = document.getElementById("dataNascimento");
    email = document.getElementById("email");
    bairro = document.getElementById("bairro");
    logradouro = document.getElementById("rua");
    numeroLogradouro = document.getElementById("numero");
    municipioId = document.getElementById("municipio");
    inscricaoEstadual = document.getElementById("inscricaoEstadual");
    promocaoId = document.getElementById("promocao");
    registrarBtn = document.getElementById("registrar");
    radioCPF = document.getElementById('cpf');
    radioCNPJ = document.getElementById('cnpj');
    documentoInput = document.getElementById('documento');
}

async function registerUser(){
    try {
        let clienteDTO = _popularDtoCliente();
        const resAjax = await ajaxPost("/caixa/register-cliente", JSON.stringify(clienteDTO));
        const response = await resAjax.json();

        if (response.ok) {
            openSuccessWindow(null, "Usuário registrado com sucesso!");
        } else {
            openErrorWindow(null, response)
        }
    } catch (err) {
        openErrorWindow("Erro ao realizar envio", "Erro ao registrar usuário:" + err.message);
    }
}

function _popularDtoCliente(){
    const clienteData = {
        nome: nome.value,
        cnpjCpf: documento.value,
        rg: rg.value,
        dataNascimento: dataNascimento.value,
        email: email.value,
        bairro: bairro.value,
        logradouro: logradouro.value,
        numeroLogradouro: numeroLogradouro.value,
        municipioId: municipioId.value,
        inscricaoEstadual: inscricaoEstadual?.value || null,
        promocaoId: promocaoId?.value || null,
        snAtivo: true,
    };

    let clienteDto = new ClienteDTO(clienteData)

    return clienteDto;
}

function gerarCPF() {
    let num = () => Math.floor(Math.random() * 9) + 1;
    let cpf = Array.from({ length: 9 }, num);
    let calcDV = (cpf) => {
        let calc = (mult) => cpf.reduce((acc, n, i) => acc + n * (mult - i), 0) % 11;
        let dv1 = (calc(10) < 2 ? 0 : 11 - calc(10));
        let dv2 = (calc(11) < 2 ? 0 : 11 - calc(11));
        return [...cpf, dv1, dv2];
    };
    return calcDV(cpf).join("");
}

function setDados() {
    documento.value = gerarCPF();
    nome.value = "Nome Exemplo";
    rg.value = "12345678-9";
    dataNascimento.value = "1990-01-01";
    email.value = "exemplo@email.com";
    bairro.value = "Centro";
    logradouro.value = "Rua Exemplo";
    numeroLogradouro.value = "123";
    municipioId.value = "Cidade Exemplo";
}

function mascaraCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function mascaraCNPJ(cnpj) {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function formatarDocumento(event) {
    let valor = documentoInput.value.replace(/\D/g, '');
    
    if (radioCPF.checked) {
        valor = mascaraCPF(valor); 
    } else if (radioCNPJ.checked) {
        valor = mascaraCNPJ(valor); 
    }
    documentoInput.value = valor; 

    if (radioCPF.checked && valor.length > 14) {
        documentoInput.classList.add('border-red-500'); 
    } else if (radioCNPJ.checked && valor.length > 18) {
        documentoInput.classList.add('border-red-500'); 
    } else {
        documentoInput.classList.remove('border-red-500');
    }
}

/// CHAMAR INICIO DE FUNÇÕES

getDadosTela();

registrarBtn.addEventListener("click", () => registerUser())
documentoInput.addEventListener('input', formatarDocumento);

setDados()


radioCPF.addEventListener('change', function() {
    documentoInput.placeholder = 'Digite CPF';
    documentoInput.value = ''; 
    documentoInput.classList.remove('border-red-500'); 
});

radioCNPJ.addEventListener('change', function() {
    documentoInput.placeholder = 'Digite CNPJ';
    documentoInput.value = ''; 
    documentoInput.classList.remove('border-red-500');
});

