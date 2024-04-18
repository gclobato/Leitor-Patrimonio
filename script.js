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
        return
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start();
});

Quagga.onDetected(function(result) {
    var code = result.codeResult.code;
    alert("Número detectado: " + code);
    // Você pode fazer o que quiser com o número detectado aqui, como enviar para um servidor ou exibir na tela.
});