
let imgIndice = 0;
let IMAGENS = ["img/image1.jpg", "img/image2.png", "img/imagem3.png", "img/imagem4.png", "img/imagem5.png"];
const IMG = document.getElementById('carrosselImagem');
const totalDeQuestoes = 7;
const limiteTentativas = 2;
let pontos = 0;
let placar = 0;
let tentativas = 0;

const questoes = [
  {
    pergunta: "Quem foi o principal líder do Anarquismo?",
    alternativas: ["Karl Marx", "John Locke", "Mikhail Bakunin", "Thomas Hobbes"],
    correta: "Mikhail Bakunin"
  },
  {
    pergunta: "Qual alternativa exemplifica um processo Endotérmico?",
    alternativas: ["Queima de madeira", "Cozimento de alimentos", "Queima de velas", "Queima de propano"],
    correta: "Cozimento de alimentos"
  },
  {
    pergunta: "Quem é considerado o ''pai'' do liberalismo?",
    alternativas: ["Friedrich Hayek", "Vladimir Lenin", "Adam Smith", "Sigmund Freud"],
    correta: "Adam Smith"
  },
  {
    pergunta: "Mitocondria é o mesmo que...",
    alternativas: ["Transporte de oxigênio no sangue", "Digestão de proteínas", "Armazenamento de informações genéticas", "Produção de energia celular"],
    correta: "Produção de energia celular"
  },
  {
    pergunta: "Quem fez a obra ''O Grito''?",
    alternativas: ["Edvard Munch", "Vincent van Gogh", "Pablo Picasso", "El Greco"],
    correta: "Edvard Munch"
  },
  {
    pergunta: "Em qual ano foi inaugurada a Torre Eiffel?",
    alternativas: ["1889", "1900", "1895", "1910"],
    correta: "1889"
  },
  {
    pergunta: "Qual é o maior planeta do sistema solar?",
    alternativas: ["Terra", "Marte", "Vênus", "Júpiter"],
    correta: "Júpiter"
  }
];

let numQuestao = document.querySelector('#numQuestao');
let pergunta = document.querySelector('#pergunta');
let alternativas = document.querySelector('#alternativas');
// let alternativas = document.querySelector('#alternativas');
let instrucoes = document.querySelector('#instrucoes');

let numero = document.querySelector('#numero');
let total = document.querySelector('#total');

numero.textContent = 1;
total.textContent = totalDeQuestoes;

function carregarProximaQuestao(nQuestao) {
    numero.textContent = nQuestao + 1;
    pergunta.textContent = questoes[nQuestao].pergunta;
    for (let i = 0; i < questoes[nQuestao].alternativas.length; i++) {
        alternativas.children[i].textContent = questoes[nQuestao].alternativas[i];
    }
}
for (let i = 0; i < alternativas.children.length; i++) {
    alternativas.children[i].addEventListener('click', function() {
        verificarResposta(numero.textContent - 1, alternativas.children[i].textContent);
    });
}
//faltava isso para ir a proxima alternatica(não esquecer) 

function verificarResposta(nQuestao, respostaEscolhida) {
    let correta = questoes[nQuestao].correta;
    if (respostaEscolhida === correta) {
        pontos += 10;
        imgIndice += 1;
    } else {
        imgIndice = 0;
    }
    placar = pontos;
    instrucoes.textContent = "Pontos " + placar;

    if (nQuestao + 1 >= totalDeQuestoes) {
        fimDoJogo();
    } else {
        setTimeout(function() {
            carregarProximaQuestao(nQuestao + 1); 
        }, 1000);
    }
}
function fimDoJogo() {
    instrucoes.textContent = "Fim de Jogo!";
    pergunta.textContent = "Você conseguiu " + pontos + (pontos === 1 ? " ponto" : " pontos");
    pontos = 0;
    articleQuestoes.style.display = 'none';
}

function carregar() {
    IMG.src = IMAGENS[imgIndice];
}

// Chame as funções iniciais
carregar();
carregarProximaQuestao(0);