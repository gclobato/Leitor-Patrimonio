// Função para inicializar o Quagga
function initQuagga() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#video'),
            constraints: {
                width: 1920, // Resolução de pelo menos 1080p
                height: 1080,
                facingMode: "environment"
            },
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
        }
    }, function(err) {
        if (err) {
            console.log(err);
            // Limpar a câmera e reiniciar a inicialização
            cleanupQuagga();
            initQuagga(); // Reiniciar o Quagga
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    // Configurar o evento de detecção
    Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
        if (validateNumber(code)) {
            addToTable(code);
        } else {
            console.log("Número inválido:", code);
        }
    });
}

// Função para limpar o Quagga e parar a câmera
function cleanupQuagga() {
    Quagga.stop(); // Parar o Quagga
    var video = document.getElementById('video');
    if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(function(track) {
            track.stop(); // Parar a câmera
        });
    }
}

// Função para validar o número
function validateNumber(number) {
    var regex = /^\d{3}\.\d{3}-\d$/;
    return regex.test(number);
}

// Função para adicionar número à tabela
function addToTable(number) {
    var table = document.getElementById("numbersTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell = newRow.insertCell(0);
    cell.textContent = number;
}

// Chamar a função de inicialização quando a página carregar
window.onload = function() {
    initQuagga();
};
