// Inicializar o Quagga
Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#reader'),
        constraints: {
            width: 1920,
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
        return;
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});

// Evento de detecção de código de barras
Quagga.onDetected(function(result) {
    var code = result.codeResult.code;
    alert("Código de barras detectado: " + code);
    // Aqui você pode atualizar a interface do usuário ou fazer outras ações com o código de barras detectado
});

// Criar a interface de leitura de código de barras
var barcode = document.getElementById("barcode");
for (var i = 0; i < 20; i++) {
    var isBlack = i % 2 === 0;
    var bar = document.createElement("div");
    bar.className = isBlack ? "bar" : "white-bar";
    barcode.appendChild(bar);
}
