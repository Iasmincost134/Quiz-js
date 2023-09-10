let pontos = 0;
let vidasRestantes = 2;
//carrossel de imagens
const IMAGENS = ["img/image1.jpg", "img/aaa.JPG", "img/adam.JPG", "img/mitocondria.JPG", "img/grito.JPG", "img/Torre.jpg", "img/Jupiter.jpg"];
const IMG = document.getElementById('carrosselImagem');
let imgIndice = 0;

//Constante relacionadas às questões
const totalDeQuestoes = 7;
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

//elementos HTML
let numeroQuestao = document.querySelector('#numQuestao');
let perguntaElemento = document.querySelector('#pergunta');
let alternativasElemento = document.querySelector('#alternativas');
let instrucoesElemento = document.querySelector('#instrucoes');
let tentativasElemento = document.querySelector('#tentativas');
let elementoPergunta = document.getElementById('pergunta');
let numero = document.querySelector('#numero');
let total = document.querySelector('#total');
let vidasElement = document.getElementById('vidas');

numero.textContent = 1;
total.textContent = questoes.length;

// Função responsável por carregar a próxima questão
function carregarProximaQuestao(nQuestao) {
   // Atualiza o número da questão exibido no HTML
  numero.textContent = nQuestao + 1;
   // Carrega a pergunta da próxima questão
  perguntaElemento.textContent = questoes[nQuestao].pergunta;
  
  // Atualiza as alternativas de resposta para a próxima questão
  for (let i = 0; i < questoes[nQuestao].alternativas.length; i++) {
    alternativasElemento.children[i].textContent = questoes[nQuestao].alternativas[i];
  }
}

// Função para verificar a resposta escolhida pelo usuário
function verificarResposta(nQuestao, respostaEscolhida) {
  let correta = questoes[nQuestao].correta;
  let feedbackElemento = document.getElementById('feedback');

  if (respostaEscolhida === correta) {
    pontos+=10;
    feedbackElemento.textContent = "Resposta correta!";
    feedbackElemento.style.color = "green";
  } else {
    vidasRestantes--;
    atualizarVidas();
    feedbackElemento.textContent = "Resposta incorreta!";
    feedbackElemento.style.color = "red";
    if (vidasRestantes > 0) {
       // Caso ainda existam vidas restantes
      instrucoes.textContent = "Você perdeu, mas ainda tem " + vidasRestantes + " vida(s) restante(s). Reiniciando a próxima pergunta...";
      carregarProximaQuestao(0);
    } else {
      // Caso tenha perdido todas as vidas
      instrucoes.textContent = "Fim de Jogo!";
      pergunta.textContent = "Você conseguiu " + pontos + (pontos === 1 ? " ponto" : " pontos");
      pontos = 0;
      articleQuestoes.style.display = 'none';
    }
  }

  imgIndice += 1;
  carregar();
  placar = pontos;
  instrucoes.textContent = "Pontos: " + placar;
 // Verifica se todas as questões foram respondidas
  if (nQuestao + 1 >= questoes.length) {
    fimDoJogo();
  } else {
    setTimeout(function () {
      carregarProximaQuestao(nQuestao + 1); // Carrega a próxima questão após um intervalo de 1 segundo
    }, 1000);
  }
}
function carregar() {
  IMG.src = IMAGENS[imgIndice];
}
// Função que é chamada quando o jogo acaba
function fimDoJogo() {
  if (vidasRestantes === 0) {
     // Caso o jogador perdeu todas as vidas
    instrucoes.textContent = "Fim de Jogo!";
    pergunta.textContent = "Você conseguiu " + pontos + (pontos === 1 ? " ponto" : " pontos");
    pontos = 0;
    articleQuestoes.style.display = 'none';
  } else {
    //Caso o jogador ganhou mas ainda tem vidas restantes
    carregarProximaQuestao(0); 
    instrucoes.textContent = "Você ganhou, mas ainda tem " + vidasRestantes + " vida(s) restante(s). Reiniciando a próxima pergunta...";
  }
}

function reiniciarJogo() {
  imgIndice = 0;
  pontos = 0;
  vidasRestantes = 2;
  instrucoes.textContent = "Bem-vindo de volta ao início do Quiz!";
  atualizarVidas();
  carregarProximaQuestao(0);
  carregar();
  elementoPergunta.style.display = 'block'; // Exibe o elemento de pergunta no HTML
  tentativasElemento.style.display = 'block';
  feedbackElemento.textContent = '';
  feedbackElemento.classList.remove('feedback-correta', 'feedback-incorreta');
  //Remove a classe de seleção nas alternativas de resposta
  for (let i = 0; i < alternativasElemento.children.length; i++) {
    alternativasElemento.children[i].classList.remove('opcao-selecionada');
  }
}

function atualizarVidas() {
  vidasElement.innerHTML = 'Vidas: ';

  for (let i = 0; i < vidasRestantes; i++) {
    const vidaElement = document.createElement('span');
    vidaElement.className = 'vida';
    vidaElement.textContent = '❤️';
    vidasElement.appendChild(vidaElement);
  }

  for (let i = 0; i < 3 - vidasRestantes; i++) {
    const vidaVaziaElement = document.createElement('span');
    vidaVaziaElement.className = 'vida-vazia';
    vidaVaziaElement.textContent = '🖤';
    vidasElement.appendChild(vidaVaziaElement);
  }
}
reiniciarJogo()
