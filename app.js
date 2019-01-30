var exchangeRate = 140;
var pound, yen;
var exchangeRateSpan;

window.onload = function() {
    captureVariables();
    retrieveExchangeRate();
}

function captureVariables() {
    pound = document.querySelector("#pound");
    yen = document.querySelector("#yen");
    exchangeRateSpan = document.querySelector("#exchange-rate");

    pound.addEventListener("keyup", updateYen);
    yen.addEventListener("keyup", updatePound);
}

function retrieveExchangeRate(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.exchangeratesapi.io/latest?base=GBP&symbols=JPY", true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           exchangeRate =  JSON.parse(this.responseText).rates.JPY;
           exchangeRateSpan.innerText = exchangeRate;
           pound.value = 1;
           updateYen();
        }
    };

    xhttp.send();
}

function updateYen() {
    var poundValue;

    poundValue = pound.value;
    yen.value = poundValue * exchangeRate;
}

function updatePound() {
    var yenValue;

    yenValue = yen.value;
    pound.value = yenValue / exchangeRate;
}