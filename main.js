window.onload = initAll;

function initAll() {
    document.getElementById("reload").onclick = outraCartela;
    novaCartela();
}

function novaCartela() {
    for (let i = 0; i < 24; i++) {
        coloqueNum(i);
    }
}

var velhaCartela = [
    0, 0, 0, 0, 0,  // B
    1, 1, 1, 1, 1,  // I
    2, 2, 2, 2,     // N
    3, 3, 3, 3, 3,  // G
    4, 4, 4, 4, 4  // O
];

var uNumeros = new Array(76);

function coloqueNum(thisNum) {
    let vNum = "num" + thisNum;
    let colunas = velhaCartela[thisNum] * 15;

    let newNum;
    do {
        newNum = colunas + getNewNum() + 1;
    } while (uNumeros[newNum]);

    uNumeros[newNum] = true;
    let numElement = document.getElementById(vNum);
    numElement.innerHTML = newNum;
    numElement.className = "";
    numElement.onmousedown = trocaCor;
}

function getNewNum() {
    return Math.floor(Math.random() * 15);
}

function outraCartela() {
    for (let i = 1; i < uNumeros.length; i++) {
        uNumeros[i] = false;
    }
    novaCartela();
    return false;
}

function trocaCor(evt) {
    let thisNum;
    if (evt) {
        thisNum = evt.target;
    }
    if (thisNum.className == "") {
        thisNum.className = "trocaBG";
    } else {
        thisNum.className = "";
    }
}