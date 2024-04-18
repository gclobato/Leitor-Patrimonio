// Inicializar o Quagga com restrições de aspectRatio
Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#reader'),
        constraints: {
            width: 1920,
            height: 1080,
            facingMode: "environment",
            aspectRatio: 16/9 // Restrição de aspectRatio para ajustar o zoom
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

// Criar a interface de guia para centralizar o código de barras
var guide = document.getElementById("guide");
var barcodeWidth = 250;
var barcodeHeight = 100;
guide.style.width = barcodeWidth + "px";
guide.style.height = barcodeHeight + "px";

// Criar a interface de leitura de código de barras
var barcode = document.getElementById("barcode");
for (var i = 0; i < 20; i++) {
    var isBlack = i % 2 === 0;
    var bar = document.createElement("div");
    bar.className = isBlack ? "bar" : "white-bar";
    barcode.appendChild(bar);
}
