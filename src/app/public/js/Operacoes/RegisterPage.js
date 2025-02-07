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

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("documento").value = "";
    document.getElementById("rg").value = "";
    document.getElementById("dataNascimento").value = "";
    document.getElementById("email").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("rua").value = "";
    document.getElementById("numero").value = "";
    document.getElementById("municipio").value = "";
    document.getElementById("inscricaoEstadual").value = "";
    document.getElementById("promocao").value = "";
    
    // Resetando o radio para CPF por padrão
    document.getElementById("cpf").checked = true;
    document.getElementById("cnpj").checked = false;
}
async function registerUser(){
    try {
        let clienteDTO = _popularDtoCliente();
        const resAjax = await ajaxPost("/caixa/register-cliente", JSON.stringify(clienteDTO));
        const response = await resAjax.json();

        if (response.ok) {
            limparCampos()
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
        cnpj_cpf: documento.value,
        rg: rg.value,
        data_nascimento: dataNascimento.value,
        email: email.value,
        bairro: bairro.value,
        logradouro: logradouro.value,
        numero_logradouro: numeroLogradouro.value,
        municipio_id: municipioId.value,
        inscricaoEstadual: inscricaoEstadual?.value || null,
        promocao_id: promocaoId?.value || null,
        sn_ativo: "S",
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

