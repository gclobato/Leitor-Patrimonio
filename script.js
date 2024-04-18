Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#reader'),
        constraints: {
            width: 640,
            height: 480,
            facingMode: "environment"
        },
    },
    decoder: {
        readers: ["code_128_reader", "ean_reader", "ean_8_reader", "code_39_reader", "code_39_vin_reader", "codabar_reader", "upc_reader", "upc_e_reader", "i2of5_reader"]
<<<<<<< HEAD
    }
}, function(err) {
    if (err) {
        console.log(err);
        return
=======
    }
}, function(err) {
    if (err) {
        console.log(err);
        return
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});

Quagga.onDetected(function(result) {
    var code = result.codeResult.code;
    if (validateNumber(code)) {
        alert("Número detectado: " + code);
        addToTable(code);
    } else {
        alert("Número inválido.");
>>>>>>> parent of f038f19 (up)
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});

<<<<<<< HEAD
Quagga.onDetected(function(result) {
    var code = result.codeResult.code;
    alert("Número detectado: " + code);
    // Você pode fazer o que quiser com o número detectado aqui, como enviar para um servidor ou exibir na tela.
});
=======
function validateNumber(number) {
    // Verificar se o número corresponde ao padrão 000.000-0
    var regex = /^\d{3}\.\d{3}-\d$/;
    return regex.test(number);
}

function addToTable(number) {
    var table = document.getElementById("numbersTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell = newRow.insertCell(0);
    cell.innerHTML = number;
}
>>>>>>> parent of f038f19 (up)
