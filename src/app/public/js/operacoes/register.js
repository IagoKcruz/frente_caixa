const radioCPF = document.getElementById('cpf');
const radioCNPJ = document.getElementById('cnpj');
const documentoInput = document.getElementById('documento');

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

// Inicializa com a máscara de CPF
documentoInput.addEventListener('input', formatarDocumento);

// Troca a máscara ao selecionar CPF ou CNPJ
radioCPF.addEventListener('change', function() {
    documentoInput.placeholder = 'Digite CPF';
    documentoInput.value = ''; // Limpa o campo
    documentoInput.classList.remove('border-red-500'); // Remove borda vermelha ao mudar para CPF
});

radioCNPJ.addEventListener('change', function() {
    documentoInput.placeholder = 'Digite CNPJ';
    documentoInput.value = ''; // Limpa o campo
    documentoInput.classList.remove('border-red-500'); // Remove borda vermelha ao mudar para CNPJ
});
