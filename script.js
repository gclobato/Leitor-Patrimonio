ddocument.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var scanButton = document.getElementById('scanButton');
    var exportButton = document.getElementById('exportButton');
    var tableBody = document.querySelector('#numbersTable tbody');

    var isScanning = false;

    // Inicialização do Quagga
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: video,
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment"
            }
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
        }
    }, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    // Evento de clique no botão de scanear
    scanButton.addEventListener('click', function() {
        if (!isScanning) {
            isScanning = true;
            Quagga.start();
            console.log("Scanning started");
        }
    });

    // Evento de detecção de números
    Quagga.onDetected(function(result) {
        var code = result.codeResult.code;
        if (validateNumber(code)) {
            addToTable(code);
        }
    });

    // Evento de clique no botão de exportar
    exportButton.addEventListener('click', function() {
        exportData();
    });

    // Função para validar o número
    function validateNumber(number) {
        var regex = /^\d{3}\.\d{3}-\d$/;
        return regex.test(number);
    }

    // Função para adicionar número à tabela
    function addToTable(number) {
        var newRow = tableBody.insertRow(tableBody.rows.length);
        var cell = newRow.insertCell(0);
        cell.textContent = number;
    }

    // Função para exportar os dados da tabela
    function exportData() {
        var rows = tableBody.querySelectorAll('tr');
        var data = [];
        rows.forEach(function(row) {
            var cell = row.querySelector('td');
            if (cell) {
                data.push(cell.textContent);
            }
        });
        console.log("Data to export:", data);
        // Aqui você pode implementar a lógica para salvar ou exportar os dados como desejar
    }
});


console.log("Video element:", video);
